import { Worker } from "bullmq";
import nodemailer from "nodemailer";

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log("worker started");
    console.log(job.name);
    console.log(`prpcessing job ${job.id}`);
    const { to, subject, body } = job.data;
    console.log(body);
    const transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "awardingbody@cutm.ac.in",
        pass: "wwut qszt cvxj njly",
      },
      disableFileAccess: false,
      disableUrlAccess: false,
    });

    const response = await transpoter.sendMail({
      from: "awardingbody@cutm.ac.in",
      to: to,
      subject: subject,
      html: body,
    });
    console.log(response)
    console.log(`job ${job.id} completed successfully`);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
    removeOnComplete: {},
  }
);

worker.on("completed", (job) => {
  console.log(`job ${job.id} completed successfully`);
});

worker.on("failed", (job, error) => {
  if (job) {
    console.log(`job ${job.id} failed with error: ${error}`);
  } else {
    console.log(`A job failed with error: ${error}`);
  }
});
