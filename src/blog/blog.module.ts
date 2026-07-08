import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBlogController } from './admin-blog.controller';
import { BlogController } from './blog.controller';
import { BlogPost } from './blog-post.entity';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [BlogController, AdminBlogController],
  providers: [BlogService],
})
export class BlogModule {}
