/*
  Warnings:

  - You are about to drop the `PracticesExams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exam` to the `Practices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examName` to the `Practices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PracticesExams" DROP CONSTRAINT "PracticesExams_practiceId_fkey";

-- AlterTable
ALTER TABLE "Practices" ADD COLUMN     "exam" JSONB NOT NULL,
ADD COLUMN     "examName" TEXT NOT NULL;

-- DropTable
DROP TABLE "PracticesExams";
