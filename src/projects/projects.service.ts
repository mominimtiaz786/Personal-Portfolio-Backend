import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ReorderItemDto } from './dto/reorder-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  findAllPublished(): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { published: true },
      order: { order: 'ASC' },
    });
  }

  async findPublishedBySlug(slug: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { slug, published: true },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  findAllAdmin(): Promise<Project[]> {
    return this.projectsRepository.find({ order: { order: 'ASC' } });
  }

  async findOneAdmin(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(dto);
    return this.projectsRepository.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOneAdmin(id);
    Object.assign(project, dto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOneAdmin(id);
    await this.projectsRepository.remove(project);
  }

  async togglePublish(id: string): Promise<Project> {
    const project = await this.findOneAdmin(id);
    project.published = !project.published;
    return this.projectsRepository.save(project);
  }

  async reorder(items: ReorderItemDto[]): Promise<void> {
    await Promise.all(
      items.map((item) =>
        this.projectsRepository.update(item.id, { order: item.order }),
      ),
    );
  }
}
