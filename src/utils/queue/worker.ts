import { Worker } from "bullmq";
import nodemailer from "nodemailer";

async function sendEmail(to: string, subject: string, body: string) {
  console.log("sendEmail started")
  console.log(to)
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
  console.log("sucessfully send mail to", to);
  console.log(response);
}



const worker = new Worker(
  "job-queue",
  async (job) => {
    console.log("worlker started")
    if (job.name === "send-email") {
      const {to, subject, body } = job.data;
      console.log(job.data)
      await sendEmail(to, subject, body);      
    } else if (job.name === "chnage-status") {
       // TODO: change status of job in database
    }
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
