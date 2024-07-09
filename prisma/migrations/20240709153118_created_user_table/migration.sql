-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT,
    "photoURL" TEXT,
    "ID" TEXT,
    "groups" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
