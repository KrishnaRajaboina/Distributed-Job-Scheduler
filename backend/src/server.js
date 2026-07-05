const dispatchJobs = require("../services/dispatcherService");
const { startCronService } = require("../services/cronService");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

const app = require("./app");

const PORT = process.env.PORT || 5000;

// Swagger Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

console.log(swaggerSpec.paths);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Start Dispatcher
    setInterval(dispatchJobs, 5000);

    // Start Cron Service
    startCronService();
});