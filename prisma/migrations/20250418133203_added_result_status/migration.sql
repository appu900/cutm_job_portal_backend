-- CreateEnum
CREATE TYPE "InterviewResult" AS ENUM ('SELECTED', 'REJECTED', 'WAITLISTED');

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "interviewResult" "InterviewResult";
