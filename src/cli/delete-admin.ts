import { NestFactory } from '@nestjs/core';
import { AdminService } from '../admin/admin.service';
import { AppModule } from '../app.module';
import { parseArgs } from './parse-args';

async function run() {
  const { email } = parseArgs(process.argv.slice(2));

  if (!email) {
    console.error('Usage: npm run admin:delete -- --email=<email>');
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const adminService = app.get(AdminService);

  const deleted = await adminService.deleteByEmail(email);

  console.log(
    deleted ? `Deleted admin: ${email}` : `No admin found with email: ${email}`,
  );

  await app.close();
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to delete admin:', error);
    process.exit(1);
  });
