import { IsString } from 'class-validator';

export class ProjectLinkDto {
  @IsString()
  label: string;

  @IsString()
  url: string;
}
