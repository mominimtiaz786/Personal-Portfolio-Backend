import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactSubmission } from './contact-submission.entity';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactSubmission)
    private readonly contactRepository: Repository<ContactSubmission>,
  ) {}

  create(dto: CreateContactSubmissionDto): Promise<ContactSubmission> {
    const submission = this.contactRepository.create(dto);
    return this.contactRepository.save(submission);
  }

  findAll(): Promise<ContactSubmission[]> {
    return this.contactRepository.find({ order: { createdAt: 'DESC' } });
  }

  async markAsRead(id: string): Promise<ContactSubmission> {
    const submission = await this.contactRepository.findOne({ where: { id } });
    if (!submission) {
      throw new NotFoundException('Contact submission not found');
    }
    submission.read = true;
    return this.contactRepository.save(submission);
  }
}
