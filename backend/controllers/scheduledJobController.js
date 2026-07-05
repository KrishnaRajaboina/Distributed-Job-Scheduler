const prisma = require("../config/prisma");

const createScheduledJob = async (req, res) => {
    try {
        const { jobId, scheduledTime } = req.body;

        const scheduledJob = await prisma.scheduledJob.create({
            data: {
                jobId: Number(jobId),
                scheduledTime: new Date(scheduledTime)
            },
            include: {
                job: true
            }
        });

        res.status(201).json(scheduledJob);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getScheduledJobs = async (req, res) => {
    try {
        const scheduledJobs = await prisma.scheduledJob.findMany({
            include: {
                job: true
            }
        });

        res.json(scheduledJobs);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createScheduledJob,
    getScheduledJobs
};