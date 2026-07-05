const express = require("express");
const router = express.Router();

const {
    createScheduledJob,
    getScheduledJobs
} = require("../controllers/scheduledJobController");

const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Scheduled Jobs
 *   description: One-time Scheduled Job APIs
 */

/**
 * @swagger
 * /api/scheduled-jobs:
 *   post:
 *     summary: Create a scheduled job
 *     tags: [Scheduled Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: integer
 *               scheduledTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Scheduled job created successfully
 */
router.post("/", authMiddleware, createScheduledJob);

/**
 * @swagger
 * /api/scheduled-jobs:
 *   get:
 *     summary: Get all scheduled jobs
 *     tags: [Scheduled Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of scheduled jobs
 */
router.get("/", authMiddleware, getScheduledJobs);

module.exports = router;