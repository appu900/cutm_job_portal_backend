export const getEmailTemplate = (
  emailType: string,
  userName: string,
  jobTitle: string,
  companyName: string = "Centurion University of Technology Management"
) => {
  switch (emailType) {
    case "application_received":
      return {
        subject: "Thank You for Applying – Centurion University",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Thank You for Applying</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
              .signature { margin-top: 2em; font-style: italic; }
            </style>
          </head>
          <body>
            <p>Dear ${userName},</p>
            <p>Thank you for applying to Centurion University of Technology and Management. We have successfully received your application, and we appreciate your interest in the position of ${jobTitle}.</p>
            <p>Our team will review your application, and if your qualifications meet our needs, we will be in touch with you regarding the next steps.</p>
            <p>Thank you again for your application. We wish you the best of luck!</p>
            <div class="signature">
              <p>Regards,</p>
              <p>Baishakhi Tripathy</p>
              <p>Executive Assistant</p>
              <p>Office of DEAN - IIE & HRD</p>
              <p>CUTM, BBSR</p>
              <p>M - 8144634614</p>
            </div>
          </body>
          </html>
        `,
      };

    case "shortlisted":
      return {
        subject: "Congratulations! You are shortlisted",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Congratulations! You are shortlisted</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            <p>Hello ${userName},</p>
            <p>We are pleased to inform you that you have been shortlisted for the ${jobTitle} position at ${companyName}.</p>
            <p>Our team will contact you soon with the next steps.</p>
            <p>Best Regards,</p>
            <p>Career Team</p>
          </body>
          </html>
        `,
      };

    case "not_shortlisted":
      return {
        subject: "Update on Your Job Application",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Update on Your Job Application</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            <p>Hello ${userName},</p>
            <p>We appreciate your interest in the ${jobTitle} position at ${companyName}.</p>
            <p>Unfortunately, we have decided to move forward with other candidates at this time.</p>
            <p>We encourage you to apply for future openings.</p>
            <p>Best Regards,</p>
            <p>Career Team</p>
          </body>
          </html>
        `,
      };

    case "rejected":
      return {
        subject: "Job Application Update - Rejected",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Job Application Update - Rejected</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            <p>Hello ${userName},</p>
            <p>We regret to inform you that after careful review, your application for the ${jobTitle} position at ${companyName} has been rejected.</p>
            <p>We appreciate your interest and encourage you to apply for other roles in the future.</p>
            <p>Best Regards,</p>
            <p>Career Team</p>
          </body>
          </html>
        `,
      };

    case "interview_scheduled":
      return {
        subject: "Interview Scheduled for Your Application",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Interview Scheduled for Your Application</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            <p>Hello ${userName},</p>
            <p>We are excited to inform you that your interview for the ${jobTitle} position at ${companyName} has been scheduled.</p>
            <p>Please check your email for further details regarding the interview date, time, and location.</p>
            <p>Best Regards,</p>
            <p>Career Team</p>
          </body>
          </html>
        `,
      };

    case "cleared_all_rounds":
      return {
        subject: "Congratulations! You've Cleared All Rounds",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Congratulations! You've Cleared All Rounds</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            <p>Hello ${userName},</p>
            <p>We are delighted to inform you that you have successfully cleared all rounds for the ${jobTitle} position at ${companyName}.</p>
            <p>Our HR team will reach out to you shortly with the next steps.</p>
            <p>Best Regards,</p>
            <p>Career Team</p>
          </body>
          </html>
        `,
      };
    case "interview_round_cleared":
      return {
        subject: "Congratulations! Interview Round Cleared",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Congratulations! Interview Round Cleared</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            <p>Hello ${userName},</p>
            <p>We are delighted to inform you that you have successfully cleared an interview round for the ${jobTitle} position at ${companyName}.</p>
            <p>Our team will contact you soon with details about the next steps in the hiring process.</p>
            <p>Best Regards,</p>
            <p>Career Team</p>
          </body>
          </html>
        `,
      };

    default:
      return {
        subject: "Job Application Update",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Job Application Update</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; }
              p { margin-bottom: 1em; }
            </style>
          </head>
          <body>
            <p>Hello ${userName},</p>
            <p>We have an update regarding your job application.</p>
          </body>
          </html>
        `,
      };
  }
};
