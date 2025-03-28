import { Job, User } from "@prisma/client";
import { ApplyJobInput } from "../dto/user.dto";
import {
  IJobRepository,
  IUserRepository,
} from "../interface/adminRepository.interface";
import { IApplicationRepository } from "../interface/applicationRepository.interface";
import JobRepositoty from "../repository/job.repository";
import { addEmailJob } from "../utils/queue/queue";
import MailTypes from "../utils/mails/mail.types";

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

  async getAllApplications() {
    return await this._applicationRepository.getAll();
  }
}

export default ApplicationService;
