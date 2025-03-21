import { JobType } from "@prisma/client";
import { IsEmail, IsNotEmpty, isNumber, IsString, min } from "class-validator";
export class InputJobRequestDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

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

  adminId!: number;
}
