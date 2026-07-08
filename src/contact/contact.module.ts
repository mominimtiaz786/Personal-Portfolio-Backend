import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminContactController } from './admin-contact.controller';
import { ContactController } from './contact.controller';
import { ContactSubmission } from './contact-submission.entity';
import { ContactService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactSubmission])],
  controllers: [ContactController, AdminContactController],
  providers: [ContactService],
})
export class ContactModule {}
