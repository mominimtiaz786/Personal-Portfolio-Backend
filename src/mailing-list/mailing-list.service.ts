import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailingListSubscriber } from './mailing-list-subscriber.entity';
import { SubscribeDto } from './dto/subscribe.dto';

@Injectable()
export class MailingListService {
  constructor(
    @InjectRepository(MailingListSubscriber)
    private readonly subscriberRepository: Repository<MailingListSubscriber>,
  ) {}

  async subscribe(dto: SubscribeDto): Promise<void> {
    const existing = await this.subscriberRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      return;
    }
    const subscriber = this.subscriberRepository.create(dto);
    await this.subscriberRepository.save(subscriber);
  }

  findAll(): Promise<MailingListSubscriber[]> {
    return this.subscriberRepository.find({ order: { subscribedAt: 'DESC' } });
  }
}
