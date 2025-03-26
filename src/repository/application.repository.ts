import { PrismaClient } from "@prisma/client";
import { IApplicationRepository } from "../interface/applicationRepository.interface";
import { prisma } from "../config/database.config";
import { ApplyJobInput } from "../dto/user.dto";
class AppplicationRepository implements IApplicationRepository {
  private _prisma: PrismaClient = prisma;
  async create(data: ApplyJobInput): Promise<any> {
    return await  this._prisma.jobApplication.create({
      data: {
        jobId: data.jobId,
        userId: data.userId,
      },
    });
  }
  findOne(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<any> {
    return await this._prisma.jobApplication.findMany()
  }
}



export default AppplicationRepository