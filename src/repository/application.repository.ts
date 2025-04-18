import {
  ApplicationStatus,
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
}

export default AppplicationRepository;
