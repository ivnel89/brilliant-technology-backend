import { Controller, Post, Body, Put, Param, } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentContract } from './contract/comment.contract';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpVoteCommentDto } from './dto/up-vote-comment.dto';
import { CommentContractMapper } from './mapper/comment.mapper';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  private commentContractMapper = new CommentContractMapper();

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentContract> {
    const comment = await this.commentService.create(createCommentDto);
    return this.commentContractMapper.build(comment);
  }

  @Put(':id/upvote/add')
  async addUpVote(
    @Param('id') id: string,
    @Body() upVoteCommentDto: UpVoteCommentDto,
  ): Promise<CommentContract> {
    const comment = await this.commentService.addUpVote(id, upVoteCommentDto);
    return this.commentContractMapper.build(comment, upVoteCommentDto.userId);
  }

  @Put(':id/upvote/remove')
  async removeUpVote(
    @Param('id') id: string,
    @Body() upVoteCommentDto: UpVoteCommentDto,
  ): Promise<CommentContract> {
    const comment = await this.commentService.removeUpVote(id, upVoteCommentDto);
    return this.commentContractMapper.build(comment, upVoteCommentDto.userId);
  }
}
