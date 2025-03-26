import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interface/adminRepository.interface";
import { prisma } from "../config/database.config";
import { ApplyJobInput, EducationDTO, UserDTO } from "../dto/user.dto";

class UserRepository implements IUserRepository {
  private _prisma: PrismaClient;
  constructor() {
    this._prisma = prisma;
  }
  applyJob(UserJobApplyData: ApplyJobInput): Promise<any> {
    return this._prisma.jobApplication.create({
      data: {
        userId: UserJobApplyData.userId,
        jobId: UserJobApplyData.jobId,
      },
    });
  }
  async createUser(
    userData: UserDTO,
    usereducationData: EducationDTO[]
  ): Promise<any> {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            name: userData.name,
            email: userData.email,
            hashedPassword: userData.password,
            phoneNumber: userData.phoneNumber,
            resumeUrl: userData.resumeUrl,
            exprience: userData.experience,
            role: userData.role,
          },
        });
        const education = await tx.education.createMany({
          data: usereducationData.map((edu) => ({
            educationName: edu.educationName,
            InstituteName: edu.InstituteName,
            timeLine: edu.timeLine,
            Percentage: edu.Percentage,
            userId: user.id,
          })),
        });

        return { user, education };
      });
      return result;
    } catch (error) {
      throw new Error(
        `Failed to create user: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  createEducation(data: EducationDTO): Promise<any> {
    return this._prisma.education.create({
      data: {
        educationName: data.educationName,
        InstituteName: data.InstituteName,
        timeLine: data.timeLine,
        Percentage: data.Percentage,
        userId: data.userId,
      },
    });
  }
  findOneByEmail(email: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updatePassword(data: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateProfile(data: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async create(userData: UserDTO): Promise<any> {
    try {
      const user = await this._prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          hashedPassword: userData.password,
          phoneNumber: userData.phoneNumber,
          resumeUrl: userData.resumeUrl,
          exprience: userData.experience,
          role: userData.role,
        },
      });
      return user;
    } catch (error) {
      throw new Error(
        `Failed to create user: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  async findOne(data: any): Promise<any> {
    return await prisma.user.findFirst({ where: { email: data.email } });
  }
}

export default UserRepository;
