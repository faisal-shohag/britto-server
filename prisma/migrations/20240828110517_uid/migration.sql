/*
  Warnings:

  - You are about to drop the column `districts` on the `Users` table. All the data in the column will be lost.
  - Made the column `displayName` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "districts",
ADD COLUMN     "district" TEXT,
ADD COLUMN     "uid" TEXT,
ALTER COLUMN "displayName" SET NOT NULL;
