/*
  Warnings:

  - You are about to drop the column `groups` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "groups",
ADD COLUMN     "group" TEXT;
