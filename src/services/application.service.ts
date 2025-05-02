import {
  ApplicationStatus,
  InterviewResult,
  Job,
  JobApplication,
  User,
} from "@prisma/client";
import { ApplyJobInput } from "../dto/user.dto";
import {
  IJobRepository,
  IUserRepository,
} from "../interface/adminRepository.interface";
import { IApplicationRepository } from "../interface/applicationRepository.interface";
import JobRepositoty from "../repository/job.repository";
import { addEmailJob, sendFormattedMail } from "../utils/queue/queue";
import MailTypes from "../utils/mails/mail.types";
import { ScheduleInterviewDto } from "../dto/interview.dto";
import { prisma } from "../config/database.config";

class ApplicationService {
  private _applicationRepository: IApplicationRepository;
  private _userRepository: IUserRepository;
  private _jobRepository: IJobRepository;
  constructor(
    repository: IApplicationRepository,
    userRepository: IUserRepository
  ) {
    this._applicationRepository = repository;
    this._userRepository = userRepository;
    this._jobRepository = new JobRepositoty();
  }

  async createApllication(data: ApplyJobInput) {
    try {
      const jobDetails: Job | null = await this._jobRepository.findById(
        data.jobId
      );
      const user: User = await this._userRepository.findById(data.userId);
      if (!user) {
        throw new Error("Invalid User ID");
      }
      if (!jobDetails) {
        throw new Error("Invalid Job ID");
      }
      const result = await this._applicationRepository.create(data);
      addEmailJob(
        user.name,
        user.email,
        jobDetails.title,
        MailTypes.APPLICATION_RECEIVED
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async fetchApplicationDetails(applicationId: number) {
    const response = await prisma.jobApplication.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        user: true,
        job: true,
      },
    });
    return response;
  }

  async scheduleInterview(data: ScheduleInterviewDto) {
    // first look for the application status is it rejected or not
    const application = await prisma.jobApplication.findUnique({
      where: { id: data.jobApplicationId },
      include: {
        job: {
          select: {
            title: true,
          },
        },
      },
    });
    console.log(application);
    if (!application) {
      throw new Error("Application not found");
    }
    if (application.status == "PENDING" || application.status == "REJECTED") {
      throw new Error(
        `you cant schedule interview for this application application status is ${application.status}`
      );
    }
    const response = await this._applicationRepository.scheduleInterview(
      data.interviewerName,
      data.interviewerEmail,
      data.interviewerPhone,
      data.jobApplicationId,
      data.modeOfInterview,
      data.scheduleDate
    );
    if (!response) {
      throw new Error("Failed to schedule interview");
    }

    sendFormattedMail(
      application.userId,
      MailTypes.INTERVIEW_SCHEDULED,
      application.job.title
    );
    return response;
  }

  async updateInterviewResultStatus(interviewId: number, status: string) {
    const interviewStatus = status.toUpperCase() as InterviewResult;
    let response;
    if (interviewStatus === "SELECTED") {
      response = await this._applicationRepository.updateInterviewStatus(
        interviewId
      );
      if (!response) {
        throw new Error("Failed to update interview result status");
      }
      sendFormattedMail(
        response.jobApplication.userId,
        MailTypes.CLEARED_INTERVIEW,
        response.jobApplication.job.title
      );
    } else if (interviewStatus === "REJECTED") {
      response = await this._applicationRepository.rejectApplication(
        interviewId
      );
      if (!response) {
        throw new Error("Failed to reject application");
      }
      sendFormattedMail(
        response.jobApplication.userId,
        MailTypes.APPLICATION_REJECTED,
        response.jobApplication.job.title
      );
    }
    if (!response) {
      throw new Error("Failed to update interview result status");
    }
    return response;
  }

  async getAllApplications() {
    return await this._applicationRepository.getAll();
  }

  async fetchAllInterviwsOfApplication(applicationId: number) {
    console.log("here");
    const response = await prisma.interview.findMany({
      where: {
        jobApplicationId: applicationId,
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
    console.log(response);
  }

  async fetchDetails(id: number) {
    const application = await prisma.jobApplication.findUnique({
      where: { id },
      include: {
        user: true,
        job: true,
        Interview: true,
      },
    });
    if (!application) {
      throw new Error("Application not found");
    }

    return application;
  }

  async updateApplicationStatus(
    applicationId: number,
    status: string,
    jobRole: string
  ) {
    const applicationStatus = status.toUpperCase() as ApplicationStatus;
    console.log(applicationStatus);
    const application: JobApplication =
      await this._applicationRepository.findOne({ id: applicationId });
    if (!application) {
      throw new Error("Invalid Application ID");
    }
    switch (applicationStatus) {
      case "INTERVIEW_SCHEDULED":
        const response = await this._applicationRepository.updateStatus(
          applicationId,
          ApplicationStatus.INTERVIEW_SCHEDULED
        );
        sendFormattedMail(
          application.userId,
          MailTypes.INTERVIEW_SCHEDULED,
          jobRole
        );
        return response;
      case "ACCEPTED":
        const res = await this._applicationRepository.updateStatus(
          applicationId,
          ApplicationStatus.ACCEPTED
        );
        sendFormattedMail(
          application.userId,
          MailTypes.APPLICATION_SHORTLISTED,
          jobRole
        );
        return res;
      case "REJECTED":
        const result = await this._applicationRepository.updateStatus(
          applicationId,
          ApplicationStatus.REJECTED
        );
        sendFormattedMail(
          application.userId,
          MailTypes.APPLICATION_NOT_SHORTLISTED,
          jobRole
        );
        return result;

      default:
        throw new Error("Invalid Application Status");
    }
  }

  async fetchAllScheduledInterview() {
    const response = await prisma.interview.findMany({
      where: {
        status: "SCHEDULED",
      },
      include: {
        jobApplication:true
      },
    });
    return response
  }

  async fetchAllInterviewByUserID(userID: number) {
    const response = await this._applicationRepository.getInterviewesByUserID(
      userID
    );
    return response;
  }
}

export default ApplicationService;
