const prisma = require("../config/prisma");

// Create Batch with Multiple Jobs
const createBatch = async (req, res) => {
    try {

        const { name, jobs } = req.body;

        const batch = await prisma.batch.create({
            data: {
                name
            }
        });

        for (const job of jobs) {

            await prisma.job.create({
                data: {
                    title: job.title,
                    description: job.description,
                    userId: req.user.id,
                    projectId: job.projectId || null,
                    queueId: job.queueId || null,
                    batchId: batch.id
                }
            });

        }

        res.status(201).json({
            message: "Batch created successfully",
            batchId: batch.id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Get Batch Progress
const getBatchProgress = async (req, res) => {

    try {

        const batchId = Number(req.params.id);

        const jobs = await prisma.job.findMany({
            where: {
                batchId
            }
        });

        const total = jobs.length;

        const completed = jobs.filter(
            j => j.status === "Completed"
        ).length;

        const failed = jobs.filter(
            j => j.status === "Failed"
        ).length;

        const pending = jobs.filter(
            j => j.status === "Pending"
        ).length;

        const running = jobs.filter(
            j => j.status === "Running"
        ).length;

        res.json({
            batchId,
            total,
            completed,
            failed,
            pending,
            running,
            progress:
                total === 0
                    ? 0
                    : ((completed + failed) / total * 100).toFixed(2) + "%"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    createBatch,
    getBatchProgress
};