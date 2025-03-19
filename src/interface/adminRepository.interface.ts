import { Job } from "@prisma/client";
import { InputJobRequestDTO } from "../dto/job.dto";

export interface IAdminRepository {
  create(data: any): Promise<any>;
  findOne(data: any): Promise<any>;
}

export interface IJobRepository {
  create(data: InputJobRequestDTO): Promise<Job>;
  get(): Promise<Job[]>;
}
