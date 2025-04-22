import {
  ApplicationStatus,
  InterviewResult,
  InterviewStatus,
  ModeOfInterview,
  PrismaClient,
} from "@prisma/client";
import { IApplicationRepository } from "../interface/applicationRepository.interface";
import { prisma } from "../config/database.config";
import { ApplyJobInput } from "../dto/user.dto";
class AppplicationRepository implements IApplicationRepository {
  private _prisma: PrismaClient = prisma;

  async updateStatus(
    applicationId: number,
    newStatus: string
  ): Promise<boolean> {
    const newApplicationStatus = newStatus.toUpperCase() as ApplicationStatus;
    const result = await this._prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status: newApplicationStatus,
      },
    });
    return true;
  }

  async create(data: ApplyJobInput): Promise<any> {
    return await this._prisma.jobApplication.create({
      data: {
        jobId: data.jobId,
        userId: data.userId,
      },
    });
  }

  findOne(data: any): Promise<any> {
    return this._prisma.jobApplication.findUnique({
      where: {
        id: data.id,
      },
    });
  }
  async getAll(): Promise<any> {
    return await this._prisma.jobApplication.findMany({
      include: {
        job: true,
        user: {
          select: {
            name: true,
            email: true,
            phoneNumber: true,
            resumeUrl: true,
            exprience: true,
            education: true,
          },
        },
      },
    });
  }

  async scheduleInterview(
    inrerviewerName: string,
    interviewerEmail: string,
    intrerviewerPhone: string,
    jobApplicationId: number,
    modeOfInterview: ModeOfInterview,
    sheduleDate: Date
  ): Promise<any> {
    const modefInterviewEnum =
      ModeOfInterview[
        ModeOfInterview as unknown as keyof typeof ModeOfInterview
      ];
    const interviewMode = modeOfInterview.toUpperCase() as ModeOfInterview;
    const interviewStatus = "SCHEDULED" as ApplicationStatus;
    return await this._prisma.interview.create({
      data: {
        jobApplicationId: jobApplicationId,
        scheduledAt: sheduleDate,
        interviewerName: inrerviewerName,
        interviewerPhone: intrerviewerPhone,
        interviewerEmail: interviewerEmail,
        modeOfInterview,
        status: "SCHEDULED",
      },
      include: {
        jobApplication: {
          include: {
            user: true,
            job: true,
          },
        },
      },
    });
  }

  async updateInterviewStatus(
    interviewID: number,
  ): Promise<any> {
    const result = await prisma.$transaction(async (tx) => {
      const interviewData = await tx.interview.findUnique({
        where: { id: interviewID },
        include: {
          jobApplication: {
            select: {
              userId: true,
              job: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });
      if (!interviewData) {
        throw new Error("Interview not found");
      }
      const jobApplicationID = interviewData.jobApplicationId;
      const updatedInterviewData = await tx.interview.update({
        where: {
          id: interviewID,
        },
        data: {
          status: "COMPLETED",
          interviewResult: "SELECTED",
        },
      });
      const jobApplication = await tx.jobApplication.findUnique({
        where: { id: jobApplicationID },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          job: true,
        },
      });
      return {
        jobApplication,
        updatedInterviewData,
      };
    });
    console.log(result);
    return result;
  }

  async updateInterviewResultStatus(
    interviewID: number,
    result: InterviewResult
  ): Promise<any> {
    return await this._prisma.interview.update({
      where: {
        id: interviewID,
      },
      data: {
        interviewResult: "SELECTED",
      },
    });
  }

  async rejectApplication(interviewID: number): Promise<any> {
    const result = await prisma.$transaction(async (tx) => {
      // Find the interview with related data
      const interviewData = await tx.interview.findUnique({
        where: { id: interviewID },
        include: {
          jobApplication: {
            select: {
              userId: true,
              job: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });

      if (!interviewData) {
        throw new Error("Interview not found");
      }

      const userId = interviewData.jobApplication.userId;
      const jobApplicationID = interviewData.jobApplicationId;

      // Update the job application status
      const jobApplicationData = await tx.jobApplication.update({
        where: { id: jobApplicationID },
        data: {
          status: ApplicationStatus.REJECTED,
        },
      });

      const interviewResult = await tx.interview.update({
        where: { id: interviewID },
        data: {
          status: InterviewStatus.COMPLETED,
          interviewResult: InterviewResult.REJECTED,
        },
      });

      const jobApplication = await tx.jobApplication.findUnique({
        where: { id: jobApplicationID },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          job: true,
        },
      });

      return {
        jobApplication,
        interviewResult,
      };
    });
    console.log(result);
    return result;
  }
}

export default AppplicationRepository;
