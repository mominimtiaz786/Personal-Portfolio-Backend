import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { toListResponse } from '../common/list-response';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin/blog')
export class AdminBlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll() {
    const posts = await this.blogService.findAllAdmin();
    return toListResponse(posts);
  }

  @Post()
  create(@Body() dto: CreateBlogPostDto) {
    return this.blogService.create(dto);
  }

  @Patch(':id/publish')
  publish(@Param('id') id: string) {
    return this.blogService.publish(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBlogPostDto) {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
