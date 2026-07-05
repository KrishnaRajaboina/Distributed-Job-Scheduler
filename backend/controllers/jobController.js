const prisma = require("../config/prisma");

const createJob = async (req, res) => {
    try {

        const {
            title,
            description,
            projectId,
            queueId,
            delayUntil,
            maxRetries,
            retryStrategy,
            retryDelay
        } = req.body;

        const job = await prisma.job.create({
            data: {
                title,
                description,
                userId: req.user.id,
                projectId: projectId ? Number(projectId) : null,
                queueId: queueId ? Number(queueId) : null,
                delayUntil: delayUntil ? new Date(delayUntil) : null,

                maxRetries: maxRetries ? Number(maxRetries) : 3,

                retryStrategy: retryStrategy || "FIXED",

                retryDelay: retryDelay ? Number(retryDelay) : 5000
            }
        });

        res.status(201).json(job);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getJobs = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 10,
            status,
            projectId,
            queueId
        } = req.query;

        const filters = {};

        if (status) {
            filters.status = status;
        }

        if (projectId) {
            filters.projectId = Number(projectId);
        }

        if (queueId) {
            filters.queueId = Number(queueId);
        }

        const jobs = await prisma.job.findMany({
            where: filters,

            include: {
                project: true,
                queue: true
            },

            skip: (Number(page) - 1) * Number(limit),

            take: Number(limit),

            orderBy: {
                createdAt: "desc"
            }
        });

        const total = await prisma.job.count({
            where: filters
        });

        res.json({
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
            jobs
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            status,
            projectId,
            queueId
        } = req.body;

        const job = await prisma.job.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                description,
                status,
                projectId: projectId ? Number(projectId) : null,
                queueId: queueId ? Number(queueId) : null
            }
        });

        res.json(job);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.job.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
};