import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  findByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async validateCredentials(email: string, password: string): Promise<Admin | null> {
    const admin = await this.findByEmail(email);
    if (!admin) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    return isMatch ? admin : null;
  }

  async upsertPassword(email: string, plainPassword: string): Promise<Admin> {
    const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    const existing = await this.findByEmail(email);

    if (existing) {
      existing.passwordHash = passwordHash;
      return this.adminRepository.save(existing);
    }

    const admin = this.adminRepository.create({ email, passwordHash });
    return this.adminRepository.save(admin);
  }

  async deleteByEmail(email: string): Promise<boolean> {
    const result = await this.adminRepository.delete({ email });
    return (result.affected ?? 0) > 0;
  }
}
