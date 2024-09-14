/*
  Warnings:

  - You are about to drop the column `duration` on the `Course` table. All the data in the column will be lost.
  - Added the required column `end` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "duration",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
