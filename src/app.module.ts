import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { MailingListModule } from './mailing-list/mailing-list.module';
import { ProjectsModule } from './projects/projects.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'sqljs' as const,
        location: join(
          process.cwd(),
          configService.get<string>('DB_PATH', './data/portfolio.sqlite'),
        ),
        autoSave: true,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(
            process.cwd(),
            configService.get<string>('UPLOADS_PATH', './uploads'),
          ),
          serveRoot: '/uploads',
        },
      ],
    }),
    AuthModule,
    ProjectsModule,
    BlogModule,
    ContactModule,
    MailingListModule,
    UploadsModule,
  ],
})
export class AppModule {}
