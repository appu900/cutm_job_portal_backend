import { IsEmail, IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class ScheduleInterviewDto {
  @IsNotEmpty()
  @IsString()
  interviewerName!: string;

  @IsNotEmpty()
  @IsEmail()
  interviewerEmail!: string;

  @IsNotEmpty()
  @IsString()
  interviewerPhone!: string;

  @IsNotEmpty()
  @IsNumber()
  jobApplicationId!: number;

  @IsNotEmpty()
  @IsString()
  modeOfInterview!: string;

  @IsNotEmpty()
  @IsDate()
  scheduleDate!: Date;

}