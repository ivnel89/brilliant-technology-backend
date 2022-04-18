import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private readonly userService: UserService
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const user = await this.userService.findOne(createArticleDto?.authorId);
    return this.articleRepository.save(
      new Article(user, createArticleDto?.content),
    );
  }

  findAll(findAllArticleDto: FindAllArticleDto): Promise<Array<Article>> {
    const { limit = 10, offset = 0} = findAllArticleDto
    return this.articleRepository.find({
      order: {
        lastModifiedDate: 'ASC',
      },
      skip: offset,
      take: limit,
    });  }

  findOne(id: string): Promise<Article> {
    return this.articleRepository.findOne({
      where: {
        id,
      },
    });  
  }
}
