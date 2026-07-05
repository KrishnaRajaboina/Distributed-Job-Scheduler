const express = require("express");
const router = express.Router();

const workerController = require("../controllers/workerController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Workers
 *   description: Worker Management APIs
 */

/**
 * @swagger
 * /api/workers:
 *   post:
 *     summary: Register a new worker
 *     tags: [Workers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Worker registered successfully
 */
router.post("/", authMiddleware, workerController.createWorker);

/**
 * @swagger
 * /api/workers:
 *   get:
 *     summary: Get all workers
 *     tags: [Workers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workers
 */
router.get("/", authMiddleware, workerController.getWorkers);

/**
 * @swagger
 * /api/workers/{id}/status:
 *   put:
 *     summary: Update worker status
 *     tags: [Workers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Worker status updated
 */
router.put("/:id/status", authMiddleware, workerController.updateWorkerStatus);

/**
 * @swagger
 * /api/workers/{id}/heartbeat:
 *   put:
 *     summary: Update worker heartbeat
 *     tags: [Workers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Heartbeat updated
 */
router.put("/:id/heartbeat", authMiddleware, workerController.updateHeartbeat);

module.exports = router;