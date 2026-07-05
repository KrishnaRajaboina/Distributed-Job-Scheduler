-- CreateTable
CREATE TABLE "CronJob" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "cronExpression" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CronJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CronJob_jobId_key" ON "CronJob"("jobId");

-- AddForeignKey
ALTER TABLE "CronJob" ADD CONSTRAINT "CronJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
