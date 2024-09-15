/*
  Warnings:

  - The `type` column on the `Exam` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "type",
ADD COLUMN     "type" JSONB[];
