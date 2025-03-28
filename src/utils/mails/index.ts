export const getEmailTemplate = (
  emailType: string,
  userName: string,
  jobTitle: string,
  companyName: string = "Centurion University of Technology Management"
) => {
  switch (emailType) {
    case "application_received":
      return {
        subject: "Thank You for Applying – Next Steps",
        text: `Hello ${userName},

Thank you for applying for the ${jobTitle} position at ${companyName}.

We appreciate your interest in joining our team. Our hiring team will review your application, and we will contact you if you are shortlisted.

Stay tuned for further updates!

Best Regards,
HR Team`,
      };

    case "shortlisted":
      return {
        subject: "Congratulations! You are shortlisted",
        text: `Hello ${userName},

We are pleased to inform you that you have been shortlisted for the ${jobTitle} position at ${companyName}.

Our team will contact you soon with the next steps.

Best Regards,
Career Team`,
      };

    case "not_shortlisted":
      return {
        subject: "Update on Your Job Application",
        text: `Hello ${userName},

We appreciate your interest in the ${jobTitle} position at ${companyName}.

Unfortunately, we have decided to move forward with other candidates at this time.

We encourage you to apply for future openings.

Best Regards,
Career Team`,
      };

    case "rejected":
      return {
        subject: "Job Application Update - Rejected",
        text: `Hello ${userName},

We regret to inform you that after careful review, your application for the ${jobTitle} position at ${companyName} has been rejected.

We appreciate your interest and encourage you to apply for other roles in the future.

Best Regards,
Career Team`,
      };

    case "interview_scheduled":
      return {
        subject: "Interview Scheduled for Your Application",
        text: `Hello ${userName},

We are excited to inform you that your interview for the ${jobTitle} position at ${companyName} has been scheduled.

Please check your email for further details regarding the interview date, time, and location.

Best Regards,
Career Team`,
      };

    case "cleared_all_rounds":
      return {
        subject: "Congratulations! You've Cleared All Rounds",
        text: `Hello ${userName},

We are delighted to inform you that you have successfully cleared all rounds for the ${jobTitle} position at ${companyName}.

Our HR team will reach out to you shortly with the next steps.

Best Regards,
Career Team`,
      };

    default:
      return {
        subject: "Job Application Update",
        text: `Hello ${userName},

We have an update regarding your job application.`,
      };
  }
};
