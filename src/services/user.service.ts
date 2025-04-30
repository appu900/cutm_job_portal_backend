import { randomUUID } from "crypto";
import {
  ApplyJobInput,
  EducationDTO,
  UserDTO,
  UserLoginDTO,
} from "../dto/user.dto";
import { IUserRepository } from "../interface/adminRepository.interface";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  makePasswordhash,
  matchPassword,
} from "../utils/security/paswordhashing";
import { prisma } from "../config/database.config";
import { generateJWT } from "../utils/jwt";

export class UserService {
  private _userRepository: IUserRepository;
  private s3Client: S3Client;
  private readonly BUCKET_NAME = process.env.BUCKET_NAME;

  constructor(repository: IUserRepository) {
    this._userRepository = repository;
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }

  /**
   * Login a user
   * @param userEmail User information
   * @param userPassword Optional resume file to upload
   * @returns Promise resolving a login user and return a  token
   */

  async LoginUser(data: UserLoginDTO) {
    const userEmail = data.email;
    const user = await this._userRepository.findOne({ email: userEmail });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordCorrect = await matchPassword(
      data.password,
      user.hashedPassword
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    const token = generateJWT(user.email, user.id, user.role);
    return {
      token,
      user
    }
  }

  /**
   * Creates a new user and uploads their resume if provided
   * @param userData User information
   * @param resumeFile Optional resume file to upload
   * @returns Promise resolving to the created user
   */
  async createUser(
    userData: UserDTO,
    userEducationData: EducationDTO[],
    resumeFile?: Express.Multer.File
  ) {
    try {
      let resumeURL: string | undefined;
      const hashedPassword = makePasswordhash(userData.password);
      if (resumeFile) {
        resumeURL = await this.uploadFileToS3(resumeFile);
      }
      userData.resumeUrl = resumeURL;
      userData.password = hashedPassword;

      // check for user exists or not
      const existingUser = await this._userRepository.findOne({
        email: userData.email,
      });
      if (existingUser) {
        throw new Error(
          `An user with the email ${userData.email} already exists`
        );
      }
      const result = await this._userRepository.createUser(
        userData,
        userEducationData
      );
      return result;
    } catch (error) {
      throw new Error(
        `Failed to create user: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Uploads a file to S3 and returns the public URL
   * @param UserId
   * @param jobId File to upload
   * @returns Promise resolving to the public URL of the uploaded file
   */
  async applyJob(Data: ApplyJobInput) {
    const response = await this._userRepository.applyJob(Data);
    return response;
  }

  /**
   * Uploads a file to S3 and returns the public URL
   * @param fileUrl
   * @param file File to upload
   * @returns Promise resolving to the public URL of the uploaded file
   */
  private async uploadFileToS3(file: Express.Multer.File): Promise<string> {
    try {
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${randomUUID()}.${fileExtension}`;

      const params = {
        Bucket: this.BUCKET_NAME || "default",
        Key: `resumes/${fileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: ObjectCannedACL.public_read,
      };

      const res = await this.s3Client.send(new PutObjectCommand(params));
      console.log("File uploaded to S3", res);
      return `https://${this.BUCKET_NAME}.s3.amazonaws.com/resumes/${fileName}`;
    } catch (error) {
      console.error("Error in uploading file in s3", error);
      throw new Error(
        `Failed to upload file to S3: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
