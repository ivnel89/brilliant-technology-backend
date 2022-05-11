import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';
import { Config } from './config';
import * as fs from 'fs';
import { BullModule } from '@nestjs/bull';
import { QueueName } from './config/queueName.enum';

const config = new Config().get();
const isDevEnvironment = new Config().isDevEnvironment;

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DATABASE_HOST,
      port: config.DATABASE_PORT,
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*{.ts,.js}'],
      logging: ['query', 'error'],
      ssl: isDevEnvironment ? undefined : { ca: fs
        .readFileSync('./src/config/db-ca-certificate.crt')
        .toString()}
    }),
    BullModule.forRoot({
      redis: {
        host: config.REDIS_HOST,
        port: Number(config.REDIS_PORT),
        password: config.REDIS_PASSWORD,
        username: config.REDIS_USERNAME,
        tls: isDevEnvironment ? undefined : {
          cert: fs
          .readFileSync('./src/config/redis-ca-certificate.crt')
          .toString()
        } 
      },
    }),
    CommentModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
