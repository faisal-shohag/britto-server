/*
  Warnings:

  - You are about to drop the column `exam` on the `Practices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Practices" DROP COLUMN "exam";

-- CreateTable
CREATE TABLE "PracticesExams" (
    "id" SERIAL NOT NULL,
    "examName" TEXT NOT NULL,
    "exam" JSONB NOT NULL,
    "practiceId" INTEGER NOT NULL,

    CONSTRAINT "PracticesExams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PracticesExams" ADD CONSTRAINT "PracticesExams_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
