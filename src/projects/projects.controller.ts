import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { toListResponse } from '../common/list-response';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    const projects = await this.projectsService.findAllPublished();
    return toListResponse(projects);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.projectsService.findPublishedBySlug(slug);
  }
}
