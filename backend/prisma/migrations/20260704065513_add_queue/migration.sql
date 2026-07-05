-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "queueId" INTEGER;

-- CreateTable
CREATE TABLE "Queue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "concurrency" INTEGER NOT NULL DEFAULT 1,
    "paused" BOOLEAN NOT NULL DEFAULT false,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
