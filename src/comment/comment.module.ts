import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ArticleModule } from 'src/article/article.module';
import { CommentProvider } from './comment.provider';
import { BullModule } from '@nestjs/bull';
import { QueueName } from 'src/config/queueName.enum';
import { CommentConsumer } from './comment.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    UserModule,
    ArticleModule,
    BullModule.registerQueue(
      {
        name: QueueName.COMMENTS_QUEUE,
      },
    ),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentProvider, CommentConsumer],
})
export class CommentModule {}
