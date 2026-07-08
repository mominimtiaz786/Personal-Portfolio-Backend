import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminMailingListController } from './admin-mailing-list.controller';
import { MailingListController } from './mailing-list.controller';
import { MailingListSubscriber } from './mailing-list-subscriber.entity';
import { MailingListService } from './mailing-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([MailingListSubscriber])],
  controllers: [MailingListController, AdminMailingListController],
  providers: [MailingListService],
})
export class MailingListModule {}
