import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { toListResponse } from '../common/list-response';
import { ContactService } from './contact.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/contact')
export class AdminContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async findAll() {
    const submissions = await this.contactService.findAll();
    return toListResponse(submissions);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }
}
