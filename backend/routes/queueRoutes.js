const express = require("express");
const router = express.Router();

const queueController = require("../controllers/queueController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Queues
 *   description: Queue Management APIs
 */

/**
 * @swagger
 * /api/queues:
 *   post:
 *     summary: Create a queue
 *     tags: [Queues]
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
 *               priority:
 *                 type: integer
 *               concurrency:
 *                 type: integer
 *               projectId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Queue created successfully
 */
router.post("/", authMiddleware, queueController.createQueue);

/**
 * @swagger
 * /api/queues:
 *   get:
 *     summary: Get all queues
 *     tags: [Queues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of queues
 */
router.get("/", authMiddleware, queueController.getQueues);

/**
 * @swagger
 * /api/queues/{id}:
 *   put:
 *     summary: Update a queue
 *     tags: [Queues]
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
 *         description: Queue updated successfully
 */
router.put("/:id", authMiddleware, queueController.updateQueue);

/**
 * @swagger
 * /api/queues/{id}:
 *   delete:
 *     summary: Delete a queue
 *     tags: [Queues]
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
 *         description: Queue deleted successfully
 */
router.delete("/:id", authMiddleware, queueController.deleteQueue);

/**
 * @swagger
 * /api/queues/{id}/pause:
 *   put:
 *     summary: Pause a queue
 *     tags: [Queues]
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
 *         description: Queue paused successfully
 */
router.put("/:id/pause", authMiddleware, queueController.pauseQueue);

/**
 * @swagger
 * /api/queues/{id}/resume:
 *   put:
 *     summary: Resume a queue
 *     tags: [Queues]
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
 *         description: Queue resumed successfully
 */
router.put("/:id/resume", authMiddleware, queueController.resumeQueue);

module.exports = router;