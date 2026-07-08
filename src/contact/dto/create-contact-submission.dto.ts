import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateContactSubmissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  engagementType: string;

  @IsString()
  @MinLength(10)
  message: string;
}
