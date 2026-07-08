import { NestFactory } from '@nestjs/core';
import { AdminService } from '../admin/admin.service';
import { AppModule } from '../app.module';
import { parseArgs } from './parse-args';

async function run() {
  const { email, password } = parseArgs(process.argv.slice(2));

  if (!email || !password) {
    console.error('Usage: npm run admin:create -- --email=<email> --password=<password>');
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const adminService = app.get(AdminService);

  const existing = await adminService.findByEmail(email);
  await adminService.upsertPassword(email, password);

  console.log(
    existing
      ? `Updated password for existing admin: ${email}`
      : `Created new admin: ${email}`,
  );

  await app.close();
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to create/update admin:', error);
    process.exit(1);
  });
