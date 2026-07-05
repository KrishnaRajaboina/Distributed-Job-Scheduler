const express = require("express");
const router = express.Router();

const { getMetrics } = require("../controllers/metricsController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: System Monitoring and Metrics APIs
 */

/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Get system metrics
 *     description: Returns overall statistics about jobs, workers, queues, executions, and system performance.
 *     tags: [Metrics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System metrics retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getMetrics);

module.exports = router;