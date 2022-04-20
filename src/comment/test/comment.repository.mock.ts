import { getRepositoryToken } from "@nestjs/typeorm";
import { mockArticle } from "src/article/test/article.repository.mock";
import { mockUser } from "src/user/test/user.repository.mock";
import { Comment } from "../entities/comment.entity";

const mockComment = new Comment(
  mockUser,
  mockArticle,
  "comment content"
  )
mockComment.upVoters = [];
  
  const CommentRepository = {
    provide: getRepositoryToken(Comment),
    useValue: {
      save: jest.fn().mockImplementation((comment: Comment) => comment),
      findOne: jest.fn().mockResolvedValue(mockComment),
      create: jest.fn(),
      softDelete: jest.fn().mockResolvedValue('Deleted'),
      find: jest.fn().mockResolvedValue([mockComment]),
    },
  };

  export {mockComment, CommentRepository};