const express = require("express");
const router = express.Router();

const {
    createCronJob,
    getCronJobs
} = require("../controllers/cronJobController");

const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cron Jobs
 *   description: Recurring Cron Job APIs
 */

/**
 * @swagger
 * /api/cron-jobs:
 *   post:
 *     summary: Create a cron job
 *     tags: [Cron Jobs]
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
 *               cronExpression:
 *                 type: string
 *                 example: "0 0 * * *"
 *     responses:
 *       201:
 *         description: Cron job created successfully
 */
router.post("/", authMiddleware, createCronJob);

/**
 * @swagger
 * /api/cron-jobs:
 *   get:
 *     summary: Get all cron jobs
 *     tags: [Cron Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cron jobs
 */
router.get("/", authMiddleware, getCronJobs);

module.exports = router;