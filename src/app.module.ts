import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';
import { Config } from './config';

const config = new Config().get();

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
    }),
    CommentModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
