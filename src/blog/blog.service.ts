import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepository: Repository<BlogPost>,
  ) {}

  findAllPublished(limit?: number): Promise<BlogPost[]> {
    return this.blogRepository.find({
      where: { published: true },
      order: { publishedAt: 'DESC' },
      take: limit,
    });
  }

  async findPublishedBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogRepository.findOne({
      where: { slug, published: true },
    });
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }
    return post;
  }

  findAllAdmin(): Promise<BlogPost[]> {
    return this.blogRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneAdmin(id: string): Promise<BlogPost> {
    const post = await this.blogRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Blog post not found');
    }
    return post;
  }

  create(dto: CreateBlogPostDto): Promise<BlogPost> {
    const post = this.blogRepository.create(dto);
    return this.blogRepository.save(post);
  }

  async update(id: string, dto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findOneAdmin(id);
    Object.assign(post, dto);
    return this.blogRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOneAdmin(id);
    await this.blogRepository.remove(post);
  }

  async publish(id: string): Promise<BlogPost> {
    const post = await this.findOneAdmin(id);
    post.published = true;
    if (!post.publishedAt) {
      post.publishedAt = new Date();
    }
    return this.blogRepository.save(post);
  }
}
