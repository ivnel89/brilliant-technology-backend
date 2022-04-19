import { getRepositoryToken } from "@nestjs/typeorm";
import { Article } from "../entities/article.entity";
import { mockUser } from '../../user/test/user.repository.mock';
import { Comment } from "src/comment/entities/comment.entity";

export const mockArticle = new Article(
    mockUser,
    "article content"
  )

  mockArticle.comments = [
    new Comment(mockUser, mockArticle, "comment content")
  ]
  
  export const ArticleRepository = {
    provide: getRepositoryToken(Article),
    useValue: {
      save: jest.fn().mockImplementation((article: Article) => article),
      findOne: jest.fn().mockResolvedValue(mockArticle),
      create: jest.fn(),
      softDelete: jest.fn().mockResolvedValue('Deleted'),
      find: jest.fn().mockResolvedValue([mockArticle]),
    },
  };