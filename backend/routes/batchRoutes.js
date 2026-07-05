const express = require("express");
const router = express.Router();

const {
    createBatch,
    getBatchProgress
} = require("../controllers/batchController");

const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Batch Jobs
 *   description: Batch Job Management APIs
 */

/**
 * @swagger
 * /api/batches:
 *   post:
 *     summary: Create a batch of jobs
 *     tags: [Batch Jobs]
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
 *               jobs:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Batch created successfully
 */
router.post("/", authMiddleware, createBatch);

/**
 * @swagger
 * /api/batches/{id}/progress:
 *   get:
 *     summary: Get batch progress
 *     tags: [Batch Jobs]
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
 *         description: Batch progress retrieved successfully
 */
router.get("/:id/progress", authMiddleware, getBatchProgress);

module.exports = router;