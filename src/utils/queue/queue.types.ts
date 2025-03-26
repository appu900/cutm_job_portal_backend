export type MAIL_TYPE = "APPLY_JOB" | "REJECTION_MAIL";

export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
  attachments?: string[];
  cc?: string[];
}
