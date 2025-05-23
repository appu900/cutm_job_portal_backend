const MailTypes = {
  APPLICATION_RECEIVED: "application_received",
  APPLICATION_SHORTLISTED: "shortlisted",
  APPLICATION_REJECTED: "rejected",
  APPLICATION_NOT_SHORTLISTED: "not_shortlisted",
  INTERVIEW_SCHEDULED: "interview_scheduled",
  CLEARED_ALL_ROUNDS: "cleared_all_rounds",
  INTERVIEW_RESULT_RECEIVED: "REJECTION_MAIL",
  INTERVIEW_FAILED: "REJECTION_MAIL",
  INTERVIEW_CANCELLED: "REJECTION_MAIL",
  NEW_JOB_POSTED: "APPLY_JOB",
  NEW_ADMIN_ADDED: "REJECTION_MAIL",
  CLEARED_INTERVIEW: "interview_round_cleared",
} as const;

export default MailTypes;
