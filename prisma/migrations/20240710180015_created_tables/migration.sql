/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "institute" TEXT,
    "photoURL" TEXT,
    "ID" TEXT,
    "groups" JSONB,
    "districts" TEXT,
    "father" TEXT,
    "mother" TEXT,
    "packages" JSONB,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "q" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "ans" INTEGER NOT NULL,
    "exp" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "author" TEXT,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practices" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "exam" JSONB NOT NULL,

    CONSTRAINT "Practices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_q_key" ON "Questions"("q");
