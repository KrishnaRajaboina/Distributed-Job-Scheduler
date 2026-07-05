const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("../routes/authRoutes");
const jobRoutes = require("../routes/jobRoutes");
const projectRoutes = require("../routes/projectRoutes");
const queueRoutes = require("../routes/queueRoutes");
const workerRoutes = require("../routes/workerRoutes");
const metricsRoutes = require("../routes/metricsRoutes");
const organizationRoutes = require("../routes/organizationRoutes");
const scheduledJobRoutes = require("../routes/scheduledJobRoutes");
const cronJobRoutes = require("../routes/cronJobRoutes");
const batchRoutes = require("../routes/batchRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/scheduled-jobs", scheduledJobRoutes);
app.use("/api/cron-jobs", cronJobRoutes);
app.use("/api/batches", batchRoutes);

app.get("/", (req, res) => {
    res.send("Distributed Job Scheduler API");
});

module.exports = app;