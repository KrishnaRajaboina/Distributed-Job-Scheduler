const cron = require("node-cron");
const prisma = require("../config/prisma");

const scheduledTasks = new Map();

const registerCronJob = (cronJob) => {

    if (scheduledTasks.has(cronJob.id)) {
        return;
    }

    if (!cron.validate(cronJob.cronExpression)) {
        console.log(`Invalid Cron Expression: ${cronJob.cronExpression}`);
        return;
    }

    const task = cron.schedule(cronJob.cronExpression, async () => {

        console.log(`Running Cron Job ${cronJob.job.id}`);

        try {

            await prisma.job.update({
                where: {
                    id: cronJob.job.id
                },
                data: {
                    status: "Pending"
                }
            });

        } catch (error) {
            console.error(error);
        }

    });

    scheduledTasks.set(cronJob.id, task);

    console.log(`Registered Cron Job ${cronJob.id}`);

};

const startCronService = async () => {

    console.log("✅ Cron Service Started");

    const cronJobs = await prisma.cronJob.findMany({
        where: {
            enabled: true
        },
        include: {
            job: true
        }
    });

    cronJobs.forEach(registerCronJob);

};

module.exports = {
    startCronService,
    registerCronJob
};