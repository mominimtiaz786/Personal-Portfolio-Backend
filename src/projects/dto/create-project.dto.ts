import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProjectLinkDto } from './project-link.dto';

export class CreateProjectDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  year: string;

  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  impact?: string;

  @IsOptional()
  @IsString()
  learning?: string;

  @IsOptional()
  @IsString()
  fullStory?: string;

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectLinkDto)
  links?: ProjectLinkDto[];

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
