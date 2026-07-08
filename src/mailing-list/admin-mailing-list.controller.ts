import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { toListResponse } from '../common/list-response';
import { MailingListService } from './mailing-list.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/mailing-list')
export class AdminMailingListController {
  constructor(private readonly mailingListService: MailingListService) {}

  @Get()
  async findAll() {
    const subscribers = await this.mailingListService.findAll();
    return toListResponse(subscribers);
  }
}
