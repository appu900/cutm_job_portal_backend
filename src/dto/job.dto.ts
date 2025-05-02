import { JobType } from "@prisma/client";
import { IsEmail, IsNotEmpty, isNumber, IsString, min } from "class-validator";
export class InputJobRequestDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  applicationDeadline?: Date;

  @IsString()
  @IsNotEmpty()
  qualification!: string;

  @IsNotEmpty()
  @IsString()
  department!: string;

  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  campus!: string;

  @IsString()
  @IsNotEmpty()
  salaryrange!: string;

  @IsString()
  @IsNotEmpty()
  jobType!: JobType;

  ImageUrl!: string | null;

  adminId!: number;
}

export class InterviewInputDTO {
  @IsNotEmpty()
  applicationId!: number;

  @IsString()
  @IsNotEmpty()
  date!: Date;

  interviewerName!: string;
  interviewerEmail!: string;
  interviewerPhone!: string;
  modeOfInterviewer?: string;
}
