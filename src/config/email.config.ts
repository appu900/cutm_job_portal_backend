import nodemailer from "nodemailer";
const EMAIL_ID = "";
const EMAIL_PASSWORD = "";
const sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASSWORD,
  },
});

export default sender;


