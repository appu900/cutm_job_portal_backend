/*
  Warnings:

  - Added the required column `modeOfInterview` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModeOfInterview" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "interviewerEmail" TEXT,
ADD COLUMN     "interviewerName" TEXT,
ADD COLUMN     "interviewerPhone" TEXT,
ADD COLUMN     "modeOfInterview" "ModeOfInterview" NOT NULL;
