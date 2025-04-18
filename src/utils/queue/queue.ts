import { Queue } from "bullmq";
import { getEmailTemplate } from "../mails";
import { ApplicationStatus } from "@prisma/client";
import { prisma } from "../../config/database.config";

const jobQueue = new Queue("job-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

export async function addEmailJob(
  username: string,
  to: string,
  jobTitle: string,
  mailType: string
) {
  const mailData = getEmailTemplate(
    mailType,
    username,
    jobTitle,
    "Centurion University of Technology Managment"
  );
  const subject = mailData.subject;
  const body = mailData.text;
  await jobQueue.add("send-email", { to, subject, body });
  console.log(`email add to queue: ${to}`);
}

export async function sendFormattedMail(
  userId: number,
  mailType: string,
  jobTitle: string
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    console.error(`User not found with id: ${userId}`);
    return;
  }
  const mailData = getEmailTemplate(
    mailType,
    user.name,
    jobTitle,
    "Centurion University of Technology and Management"
  );
  const subject = mailData.subject;
  const body = mailData.text;
  const to = user.email;
  await jobQueue.add("send-email", { to, subject, body });
  console.log(`email add to queue: ${to}`);
}
