import { Queue } from "bullmq";
import { getEmailTemplate } from "../mails";

const emailQueue = new Queue("email-queue", {
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
  const body = mailData.text
  await emailQueue.add("send-email", { to, subject, body });
  console.log(`email add to queue: ${to}`);
}
