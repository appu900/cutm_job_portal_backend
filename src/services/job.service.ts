import { prisma } from "../config/database.config";
import { InputJobRequestDTO } from "../dto/job.dto";
import { IJobRepository } from "../interface/adminRepository.interface";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

class JobService {
  _repository: IJobRepository;
  private s3Client: S3Client;
  private readonly BUCKET_NAME = process.env.BUCKET_NAME;
  constructor(repository: IJobRepository) {
    this._repository = repository;
      this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
    
  }

  async createJob(data: InputJobRequestDTO,posterImage?:Express.Multer.File) {
    let imageURL:string | null
    if(posterImage){
        imageURL = await this.uploadFileToS3(posterImage)
    }else{
      imageURL = null
    }

    data.ImageUrl = imageURL
    const response = await this._repository.create(data)
    return response
  }

  async fetchJobById(id: number) {
    const result = await this._repository.findById(id);
    return result;
  }

  async fetchJobDetailsIncludeApplicants(id: number) {
    const result = await prisma.job.findUnique({
      where: {
        id: id,
      },
      include: {
        JobApplication: {
          include: {
            user: true,
            job: true,
          },
        },
      },
    });
    return result;
  }

  async fetchAllJobs() {
    const result = await this._repository.get();
    return result;
  }

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

export default JobService;
