-- CreateTable
CREATE TABLE "ScheduledJob" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "scheduledTime" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledJob_jobId_key" ON "ScheduledJob"("jobId");

-- AddForeignKey
ALTER TABLE "ScheduledJob" ADD CONSTRAINT "ScheduledJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
