const prisma = require("../config/prisma");
const { registerCronJob } = require("../services/cronService");

// Create Cron Job
const createCronJob = async (req, res) => {
    try {

        const { jobId, cronExpression } = req.body;

        const cronJob = await prisma.cronJob.create({
            data: {
                jobId: Number(jobId),
                cronExpression
            },
            include: {
                job: true
            }
        });

        // Register immediately
        registerCronJob(cronJob);

        res.status(201).json(cronJob);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get All Cron Jobs
const getCronJobs = async (req, res) => {
    try {

        const cronJobs = await prisma.cronJob.findMany({
            include: {
                job: true
            }
        });

        res.json(cronJobs);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createCronJob,
    getCronJobs
};