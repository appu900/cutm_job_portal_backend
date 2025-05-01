import { AdminInputRequestDTO, AdminLoginRequestDTO } from "../dto/admin.dto";
import { IAdminRepository } from "../interface/adminRepository.interface";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/jwt";
import { Admin } from "@prisma/client";

class AdminService {
  private _repository: IAdminRepository;
  constructor(repository: IAdminRepository) {
    this._repository = repository;
  }

  async create(data: AdminInputRequestDTO) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const response = await this._repository.create({
      ...data,
      password: hashedPassword,
    });
    return response;
  }
  async login(data: AdminLoginRequestDTO) {
    const admin: Admin = await this._repository.findOne(data.email);
    if (!admin) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(data.password, admin.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const jwtToken = generateJWT(admin.email, admin.id, admin.role);
    return {
      jwtToken,
      admin,
    };
  }
}

export default AdminService;
