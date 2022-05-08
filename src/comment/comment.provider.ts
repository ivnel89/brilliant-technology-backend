import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QueueName } from 'src/config/queueName.enum';
import { UpVoteCommentDto } from './dto/up-vote-comment.dto';

@Injectable()
export class CommentProvider {
  constructor(
    @InjectQueue(QueueName.COMMENTS_QUEUE) private commentsQueue: Queue
  ) {}

  async addUpVoteJob(commentId: string, upVoteCommentDto: UpVoteCommentDto){
    console.log('adding job')
    await this.commentsQueue.add('addUpVote',{
      commentId,
      upVoteCommentDto
    })
  }

  async removeUpVoteJob(commentId: string, upVoteCommentDto: UpVoteCommentDto){
    console.log('adding job')
    await this.commentsQueue.add('removeUpVote', {
      commentId,
      upVoteCommentDto,
    });
  }
  
}
