import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MailingListService } from './mailing-list.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('mailing-list')
export class MailingListController {
  constructor(private readonly mailingListService: MailingListService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  async subscribe(@Body() dto: SubscribeDto) {
    await this.mailingListService.subscribe(dto);
    return { success: true };
  }
}
