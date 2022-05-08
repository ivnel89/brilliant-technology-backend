import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { QueueName } from 'src/config/queueName.enum';
import { CommentService } from './comment.service';
import { UpVoteCommentDto } from './dto/up-vote-comment.dto';

@Injectable()
@Processor(QueueName.COMMENTS_QUEUE)
export class CommentConsumer {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process('addUpVote')
  async processAddUpVote(job: Job<{
    commentId: string,
    upVoteCommentDto: UpVoteCommentDto
  }>){
    const {
      data: { commentId, upVoteCommentDto },
    } = job;
    console.log('consuming job')
    this.commentService.addUpVote(commentId, upVoteCommentDto)
  }

  @Process('removeUpVote')
  async processRemoveUpVote(job: Job<{
    commentId: string,
    upVoteCommentDto: UpVoteCommentDto
  }>){
    const {
        data: { commentId, upVoteCommentDto },
      } = job;
      console.log('consuming job')
      this.commentService.removeUpVote(commentId, upVoteCommentDto)
  }
  
}
