import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { toListResponse } from '../common/list-response';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const posts = await this.blogService.findAllPublished(limit);
    return toListResponse(posts);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findPublishedBySlug(slug);
  }
}
