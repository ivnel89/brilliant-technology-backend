import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly userService: UserService
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userService.findOne(createCommentDto?.authorId);
    return this.commentRepository.save(
      new Comment(user, createCommentDto?.content),
    );
  }

}
