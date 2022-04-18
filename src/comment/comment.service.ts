import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpVoteCommentDto } from './dto/up-vote-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const [ 
      user, 
      article
     ] = await Promise.all([
       this.userService.findOne(createCommentDto?.authorId),
       this.articleService.findOne(createCommentDto?.articleId)
      ])
    return this.commentRepository.save(
      new Comment(user, article, createCommentDto?.content),
    );
  }

  async addUpVote(commentId: string, upVoteCommentDto: UpVoteCommentDto) {
    const [user, comment] = await Promise.all([
      this.userService.findOne(upVoteCommentDto?.userId),
      this.findOne(commentId),
    ]);
    if (!comment.upVoters.find((user) => user.id === upVoteCommentDto.userId)) {
      comment.upVoters = [...comment.upVoters, user];
    }

    return this.commentRepository.save(comment);
  }

  async removeUpVote(commentId: string, upVoteCommentDto: UpVoteCommentDto) {
    const [user, comment] = await Promise.all([
      this.userService.findOne(upVoteCommentDto?.userId),
      this.findOne(commentId),
    ]);
    comment.upVoters = comment.upVoters.filter(
      upVoter => upVoter?.id != user.id
    );
    return this.commentRepository.save(comment);
  }

  findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne({
      where: {
        id,
      },
    });;
  }

}
