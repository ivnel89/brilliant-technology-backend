import { Controller, Post, Body, Put, Param, } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpVoteCommentDto } from './dto/up-vote-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Put(':id/upvote/add')
  addUpVote(@Param('id') id: string, @Body() upVoteCommentDto: UpVoteCommentDto) {
    return this.commentService.addUpVote(
      id, 
      upVoteCommentDto
    )
  }

  @Put(':id/upvote/remove')
  removeUpVote(@Param('id') id: string, @Body() upVoteCommentDto: UpVoteCommentDto) {
    return this.commentService.removeUpVote(
      id, 
      upVoteCommentDto
    )
  }

}
