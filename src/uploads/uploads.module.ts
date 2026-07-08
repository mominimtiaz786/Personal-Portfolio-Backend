import { BadRequestException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadsController } from './uploads.controller';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('UPLOADS_PATH'),
          filename: (_req, file, callback) => {
            const ext = extname(file.originalname).toLowerCase();
            callback(null, `${uuidv4()}${ext}`);
          },
        }),
        fileFilter: (_req, file, callback) => {
          const ext = extname(file.originalname).toLowerCase();
          if (!ALLOWED_EXTENSIONS.includes(ext)) {
            callback(
              new BadRequestException(
                'Only image files are allowed (jpg, jpeg, png, webp, gif)',
              ),
              false,
            );
            return;
          }
          callback(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
      }),
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
