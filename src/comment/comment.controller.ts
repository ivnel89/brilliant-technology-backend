import { Controller, Post, Body, Put, Param, Get, Query, } from '@nestjs/common';
import { CommentConsumer } from './comment.consumer';
import { CommentProvider } from './comment.provider';
import { CommentService } from './comment.service';
import { CommentContract } from './contract/comment.contract';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsDto } from './dto/get-comment-meta.dto';
import { UpVoteCommentDto } from './dto/up-vote-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentContractMapper } from './mapper/comment.mapper';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentProvider: CommentProvider
    ) {}
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
    await this.commentProvider.addUpVoteJob(id, upVoteCommentDto);
    const comment = await this.commentService.findOne(id);
    return this.commentContractMapper.build(comment, upVoteCommentDto.userId);
  }

  @Put(':id/upvote/remove')
  async removeUpVote(
    @Param('id') id: string,
    @Body() upVoteCommentDto: UpVoteCommentDto,
  ): Promise<CommentContract> {
   await this.commentProvider.removeUpVoteJob(id, upVoteCommentDto);
    const comment = await this.commentService.findOne(id);
    return this.commentContractMapper.build(comment, upVoteCommentDto.userId);
  }

  @Get('')
  async getComments(
    @Query() getCommentMetaDto: GetCommentsDto,
  ): Promise<Array<CommentContract>>{
    let comments: Array<Comment>;
    if(getCommentMetaDto.articleId){
      comments = await this.commentService.getCommentsByArticleId(
        getCommentMetaDto.articleId,
      );
    }else{
      comments = await this.commentService.getComments(
        getCommentMetaDto.commentIds,
      );
    }
    return this.commentContractMapper.buildArray(
      comments,
      getCommentMetaDto.userId,
    );
  }
}
