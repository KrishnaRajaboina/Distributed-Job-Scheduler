-- CreateTable
CREATE TABLE "JobExecution" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "workerId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "executionTime" INTEGER,
    "errorMessage" TEXT,

    CONSTRAINT "JobExecution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobExecution" ADD CONSTRAINT "JobExecution_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobExecution" ADD CONSTRAINT "JobExecution_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
