import { Queue, Worker } from "bullmq";

export const MessageBrokerQueue = new Queue("email-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});
