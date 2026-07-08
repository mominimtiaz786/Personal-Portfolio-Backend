import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { toListResponse } from '../common/list-response';
import { CreateProjectDto } from './dto/create-project.dto';
import { ReorderItemDto } from './dto/reorder-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/projects')
export class AdminProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    const projects = await this.projectsService.findAllAdmin();
    return toListResponse(projects);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Patch('reorder')
  reorder(
    @Body(new ParseArrayPipe({ items: ReorderItemDto }))
    items: ReorderItemDto[],
  ) {
    return this.projectsService.reorder(items);
  }

  @Patch(':id/publish')
  togglePublish(@Param('id') id: string) {
    return this.projectsService.togglePublish(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
