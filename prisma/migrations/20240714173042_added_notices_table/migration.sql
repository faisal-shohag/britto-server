-- CreateTable
CREATE TABLE "Notices" (
    "id" SERIAL NOT NULL,
    "icon" TEXT,
    "notice" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notices_pkey" PRIMARY KEY ("id")
);
