import { InterviewResult, InterviewStatus } from "@prisma/client";

export interface IApplicationRepository {
  create(data: any): Promise<any>;
  findOne(data: any): Promise<any>;
  getAll(): Promise<any>;
  updateStatus(applicationId: number, status: string): Promise<boolean>;
  scheduleInterview(
    inrerviewerName: string,
    interviewerEmail: string,
    intrerviewerPhone: string,
    jobApplicationId: number,
    modeOfInterview: string,
    sheduleDate: Date
  ): Promise<any>;
  updateInterviewResultStatus(
    interviewId: number,
    result: InterviewResult
  ): Promise<any>;
  updateInterviewStatus(interviewID: number): Promise<any>;
  rejectApplication(interviewID:number): Promise<any>;
  getInterviewesByUserID(userID:number):Promise<any>
}
