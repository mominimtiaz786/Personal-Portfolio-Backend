import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
