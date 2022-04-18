import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleContract } from './contract/article.contract';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { FindOneArticleDto } from './dto/find-one-article.dto';
import { ArticleContractMapper } from './mapper/article.mapper';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  private articleContractMapper = new ArticleContractMapper();

  @Post()
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleContract> {
    const article = await this.articleService.create(createArticleDto);
    return this.articleContractMapper.build(article);
  }

  @Get()
  async findAll(
    @Query() findAllArticleDto?: FindAllArticleDto,
  ): Promise<Array<ArticleContract>> {
    const articles = await this.articleService.findAll(findAllArticleDto);
    return this.articleContractMapper.buildArray(articles, findAllArticleDto.requesterId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() findOneArticleDto?: FindOneArticleDto,
    ): Promise<ArticleContract> {
    const article = await this.articleService.findOne(id);
    return this.articleContractMapper.build(article, findOneArticleDto.requesterId);
  }
}
