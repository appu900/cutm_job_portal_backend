import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
} from "class-validator";
import { Role } from "@prisma/client";

export class EducationDTO {
  @IsString()
  @IsNotEmpty()
  educationName!: string;

  @IsString()
  @IsNotEmpty()
  timeLine!: string;

  @IsString()
  @IsNotEmpty()
  Percentage!: string;

  @IsString()
  @IsNotEmpty()
  InstituteName!: string;

  @IsNumber()
  userId!: number;
}

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  resumeUrl?: string; // This should be a URL to the uploaded PDF file

  @IsOptional()
  @IsString()
  experience?: string;

  role?: Role;

  @IsOptional()
  education?: EducationDTO[];
}

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class ApplyJobInput {
  @IsNumber()
  userId!: number;
  @IsNumber()
  jobId!: number;

  @IsString()
  userEmail!: string;
}
