const prisma = require("../config/prisma");

const getMetrics = async (req, res) => {
    try {

        const [
            totalJobs,
            pendingJobs,
            runningJobs,
            completedJobs,
            failedJobs,
            totalWorkers,
            activeWorkers,
            idleWorkers,
            offlineWorkers,
            totalQueues
        ] = await Promise.all([

            prisma.job.count(),

            prisma.job.count({
                where: { status: "Pending" }
            }),

            prisma.job.count({
                where: { status: "Running" }
            }),

            prisma.job.count({
                where: { status: "Completed" }
            }),

            prisma.job.count({
                where: { status: "Failed" }
            }),

            prisma.worker.count(),

            prisma.worker.count({
                where: { status: "ACTIVE" }
            }),

            prisma.worker.count({
                where: { status: "IDLE" }
            }),

            prisma.worker.count({
                where: { status: "OFFLINE" }
            }),

            prisma.queue.count()

        ]);

        res.status(200).json({

            jobs: {
                total: totalJobs,
                pending: pendingJobs,
                running: runningJobs,
                completed: completedJobs,
                failed: failedJobs
            },

            workers: {
                total: totalWorkers,
                active: activeWorkers,
                idle: idleWorkers,
                offline: offlineWorkers
            },

            queues: {
                total: totalQueues
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

module.exports = {
    getMetrics
};