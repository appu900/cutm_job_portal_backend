import { Job } from "@prisma/client";
import { InputJobRequestDTO } from "../dto/job.dto";

export interface IAdminRepository {
  create(data: any): Promise<any>;
  findOne(data: any): Promise<any>;
}

export interface IUserRepository {
  create(data: any): Promise<any>;
  createEducation(data: any): Promise<any>;
  findOne(data: any): Promise<any>;
  findById(UserId:number): Promise<any>;
  findOneByEmail(email: string): Promise<any>;
  updatePassword(data: any): Promise<boolean>;
  updateProfile(data: any): Promise<boolean>;
  createUser(userData: any, usereducationData: any): Promise<any>;
  applyJob(data: any): Promise<any>;
}

export interface IJobRepository {
  create(data: InputJobRequestDTO): Promise<Job>;
  get(): Promise<Job[]>;
  findById(jobId: number): Promise<Job | null>;
}
