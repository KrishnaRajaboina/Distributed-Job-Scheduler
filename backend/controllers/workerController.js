const prisma = require("../config/prisma");

// Register Worker
const createWorker = async (req, res) => {
    try {
        const { name } = req.body;

        const worker = await prisma.worker.create({
            data: {
                name
            }
        });

        res.status(201).json(worker);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get All Workers
const getWorkers = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 10,
            status,
            shuttingDown
        } = req.query;

        const filters = {};

        if (status) {
            filters.status = status;
        }

        if (shuttingDown !== undefined) {
            filters.shuttingDown = shuttingDown === "true";
        }

        const workers = await prisma.worker.findMany({
            where: filters,

            skip: (Number(page) - 1) * Number(limit),

            take: Number(limit),

            orderBy: {
                createdAt: "desc"
            }
        });

        const total = await prisma.worker.count({
            where: filters
        });

        res.json({
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
            workers
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Update Worker Status
const updateWorkerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const worker = await prisma.worker.update({
            where: {
                id: Number(id)
            },
            data: {
                status
            }
        });

        res.json(worker);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Update Heartbeat
const updateHeartbeat = async (req, res) => {
    try {
        const { id } = req.params;

        const worker = await prisma.worker.update({
            where: {
                id: Number(id)
            },
            data: {
                lastHeartbeat: new Date()
            }
        });

        res.json(worker);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Graceful Shutdown Worker
const shutdownWorker = async (req, res) => {
    try {
        const { id } = req.params;

        const worker = await prisma.worker.update({
            where: {
                id: Number(id)
            },
            data: {
                shuttingDown: true
            }
        });

        res.json(worker);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Restart Worker
const restartWorker = async (req, res) => {
    try {
        const { id } = req.params;

        const worker = await prisma.worker.update({
            where: {
                id: Number(id)
            },
            data: {
                shuttingDown: false,
                status: "IDLE"
            }
        });

        res.json(worker);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    createWorker,
    getWorkers,
    updateWorkerStatus,
    updateHeartbeat,
    shutdownWorker,
    restartWorker
};