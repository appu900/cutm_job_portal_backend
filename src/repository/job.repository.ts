import { Job, PrismaClient } from "@prisma/client";
import { InputJobRequestDTO } from "../dto/job.dto";
import { IJobRepository } from "../interface/adminRepository.interface";
import { prisma } from "../config/database.config";

class JobRepositoty implements IJobRepository {
  _prisma: PrismaClient;
  constructor() {
    this._prisma = prisma;
  }
  async get(): Promise<Job[]> {
    const result = await this._prisma.job.findMany();
    return result;
  }
  async create(data: InputJobRequestDTO): Promise<Job> {
    const result = await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        campus: data.campus,
        salaryRange: data.salaryrange,
        jobType: data.jobType,
        adminId: data.adminId,
      },
    });
    return result;
  }
}

export default JobRepositoty;
