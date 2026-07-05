const prisma = require("../config/prisma");

const createQueue = async (req, res) => {
    try {
        const { name, priority, concurrency, projectId } = req.body;

        const queue = await prisma.queue.create({
            data: {
                name,
                priority,
                concurrency,
                projectId
            }
        });

        res.status(201).json(queue);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getQueues = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 10,
            paused
        } = req.query;

        const filters = {};

        if (paused !== undefined) {
            filters.paused = paused === "true";
        }

        const queues = await prisma.queue.findMany({
            where: filters,

            include: {
                project: true
            },

            skip: (Number(page) - 1) * Number(limit),

            take: Number(limit),

            orderBy: {
                createdAt: "desc"
            }
        });

        const total = await prisma.queue.count({
            where: filters
        });

        res.json({
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
            queues
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const updateQueue = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, priority, concurrency } = req.body;

        const queue = await prisma.queue.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                priority,
                concurrency
            }
        });

        res.json(queue);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const deleteQueue = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.queue.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Queue deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const pauseQueue = async (req, res) => {
    try {
        const { id } = req.params;

        const queue = await prisma.queue.update({
            where: {
                id: Number(id)
            },
            data: {
                paused: true
            }
        });

        res.json(queue);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

const resumeQueue = async (req, res) => {
    try {
        const { id } = req.params;

        const queue = await prisma.queue.update({
            where: {
                id: Number(id)
            },
            data: {
                paused: false
            }
        });

        res.json(queue);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createQueue,
    getQueues,
    updateQueue,
    deleteQueue,
    pauseQueue,
    resumeQueue
};