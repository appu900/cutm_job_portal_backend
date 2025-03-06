import { Prisma, PrismaClient } from "@prisma/client";
import { IAdminRepository } from "../interface/adminRepository.interface";
import { prisma } from "../config/database.config";
import { AdminInputRequestDTO } from "../dto/admin.dto";
import { DuplicateFoundError } from "../utils/errors/error";

export class AdminRepository implements IAdminRepository {
  _prisma: PrismaClient;
  constructor() {
    this._prisma = prisma;
  }
  async create(data: AdminInputRequestDTO): Promise<any> {
    try {
      return await this._prisma.admin.create({
        data: {
          name: data.name,
          passwordHash: data.password,
          email: data.email,
          campus: data.campus,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new DuplicateFoundError(
          `An admin with the email ${data.email} already exists`
        );
      }
      throw error;
    }
  }
  async findOne(email: string): Promise<any> {
    const user = await this._prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }
}
