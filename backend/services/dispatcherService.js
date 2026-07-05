const prisma = require("../config/prisma");

const dispatchJobs = async () => {
    try {

        // Find next executable job
        const job = await prisma.job.findFirst({
            where: {
                status: "Pending",
                
                AND: [
        {
            OR: [
                {
                    nextRetryAt: null
                },
                {
                    nextRetryAt: {
                        lte: new Date()
                    }
                }
            ]
        },
        {
            OR: [

                // Immediate Jobs
                {
                    delayUntil: null,
                    scheduledJob: null
                },

                // Delayed Jobs
                {
                    delayUntil: {
                        lte: new Date()
                    },
                    scheduledJob: null
                },

                // Scheduled Jobs
                {
                    scheduledJob: {
                        is: {
                            enabled: true,
                            scheduledTime: {
                                lte: new Date()
                            }
                        }
                    }
                }

            ]
        }
    ]
},

            include: {
                scheduledJob: true,
                queue: true
            },

            orderBy: {
                createdAt: "asc"
            }
        });

        if (!job) return;

        // Skip paused queues
        if (job.queue && job.queue.paused) {
            return;
        }

        // Check queue concurrency
if (job.queue) {

    const runningJobs = await prisma.job.count({
        where: {
            queueId: job.queue.id,
            status: "Running"
        }
    });

    if (runningJobs >= job.queue.concurrency) {
        console.log(
            `Queue "${job.queue.name}" reached concurrency limit (${job.queue.concurrency})`
        );
        return;
    }

}

        // Find idle worker
        const worker = await prisma.worker.findFirst({
    where: {
        status: "IDLE",
        shuttingDown: false
    }
});

if (!worker) {
    console.log("No available workers");
    return;
}

// Atomically claim worker and job
await prisma.$transaction([
    prisma.worker.update({
        where: {
            id: worker.id
        },
        data: {
            status: "ACTIVE"
        }
    }),

    prisma.job.update({
        where: {
            id: job.id
        },
        data: {
            status: "Running"
        }
    })
]);

        // Create execution history
        const execution = await prisma.jobExecution.create({
            data: {
                jobId: job.id,
                workerId: worker.id,
                status: "Running"
            }
        });

        const startTime = Date.now();

        // Create log
        await prisma.jobLog.create({
            data: {
                jobId: job.id,
                message: `Job execution started by ${worker.name}`,
                level: "INFO"
            }
        });

        console.log(`Worker ${worker.name} started Job ${job.id}`);

        setTimeout(async () => {
            try {

                // Change while testing
                const success = true;
                //const success = Math.random() < 0.7;

                if (success) {

                    await prisma.job.update({
                        where: {
                            id: job.id
                        },
                        data: {
                            status: "Completed",
                            nextRetryAt: null
                        }
                    });

                    // Disable one-time scheduled job
                    if (job.scheduledJob) {
                        await prisma.scheduledJob.update({
                            where: {
                                id: job.scheduledJob.id
                            },
                            data: {
                                enabled: false
                            }
                        });
                    }

                    await prisma.jobExecution.update({
                        where: {
                            id: execution.id
                        },
                        data: {
                            status: "Completed",
                            finishedAt: new Date(),
                            executionTime: Date.now() - startTime
                        }
                    });

                    await prisma.jobLog.create({
                        data: {
                            jobId: job.id,
                            message: "Job completed successfully",
                            level: "INFO"
                        }
                    });

                    console.log(`✅ Job ${job.id} completed`);

                } else {

                    const updatedJob = await prisma.job.update({
                        where: {
                            id: job.id
                        },
                        data: {
                            attempts: {
                                increment: 1
                            }
                        }
                    });

                    if (updatedJob.attempts >= updatedJob.maxRetries) {

                        await prisma.job.update({
                            where: {
                                id: job.id
                            },
                            data: {
                                status: "Failed",
                                nextRetryAt: null
                            }
                        });

                        await prisma.deadLetterJob.create({
                            data: {
                                title: job.title,
                                description: job.description,
                                reason: "Maximum retry attempts exceeded",
                                originalJobId: job.id
                            }
                        });

                        await prisma.jobExecution.update({
                            where: {
                                id: execution.id
                            },
                            data: {
                                status: "Failed",
                                finishedAt: new Date(),
                                executionTime: Date.now() - startTime,
                                errorMessage: "Maximum retry attempts exceeded"
                            }
                        });

                        await prisma.jobLog.create({
                            data: {
                                jobId: job.id,
                                message: "Job failed after maximum retries",
                                level: "ERROR"
                            }
                        });

                        await prisma.jobLog.create({
                            data: {
                                jobId: job.id,
                                message: "Job moved to Dead Letter Queue",
                                level: "ERROR"
                            }
                        });

                        console.log(`❌ Job ${job.id} moved to Dead Letter Queue`);

                    } else {

                        let delay = updatedJob.retryDelay;
                        switch (updatedJob.retryStrategy) {
                            case "LINEAR":
                                delay = updatedJob.retryDelay * updatedJob.attempts;
                                break;
                                
                                case "EXPONENTIAL":
                                    delay = updatedJob.retryDelay * Math.pow(2, updatedJob.attempts - 1);
                                    break;
                                default:
                                    delay = updatedJob.retryDelay;
                                }
                                
                                await prisma.job.update({
                                    where: {
                                        id: job.id
                                    },
                                    data: {
                                        status: "Pending",
                                        nextRetryAt: new Date(Date.now() + delay)
                                    }
                                });


                        await prisma.jobExecution.update({
                            where: {
                                id: execution.id
                            },
                            data: {
                                status: "Retry",
                                finishedAt: new Date(),
                                executionTime: Date.now() - startTime,
                                errorMessage: "Retry scheduled"
                            }
                        });

                        await prisma.jobLog.create({
                            data: {
                                jobId: job.id,
                                message: `Retry attempt ${updatedJob.attempts} of ${updatedJob.maxRetries}`,
                                level: "WARN"
                            }
                        });

                        console.log(
                            `🔄 Retrying Job ${job.id} (${updatedJob.attempts}/${updatedJob.maxRetries})`
                        );
                    }
                }

                // Make worker IDLE again
                const latestWorker = await prisma.worker.findUnique({
    where: {
        id: worker.id
    }
});

if (latestWorker.shuttingDown) {

    await prisma.worker.update({
        where: {
            id: worker.id
        },
        data: {
            status: "OFFLINE"
        }
    });

    console.log(`🛑 Worker ${worker.name} shut down gracefully`);

} else {

    await prisma.worker.update({
        where: {
            id: worker.id
        },
        data: {
            status: "IDLE"
        }
    });

}

            } catch (error) {
                console.error("Execution Error:", error);
            }

        }, 5000);

    } catch (error) {
        console.error("Dispatcher Error:", error);
    }
};

module.exports = dispatchJobs;