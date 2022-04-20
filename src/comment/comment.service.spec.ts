import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { ArticleRepository, mockArticle } from 'src/article/test/article.repository.mock';
import { mockUser, UserRepository } from 'src/user/test/user.repository.mock';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { createCommentDto, mockCommentId, upVoteCommentDto } from './test/comment.dto.mock';
import { CommentRepository, mockComment } from './test/comment.repository.mock';

describe('CommentService', () => {
  let service: CommentService;
  let repository: Repository<Comment>;
  let repositorySaveSpy, repositoryFindSpy, repositoryFindOneSpy, repositorySoftDeleteSpy;
  let userService: UserService;
  let articleService: ArticleService;
  let userServiceFindOneSpy, articleServiceFindOneSpy;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        CommentRepository,
        UserService,
        UserRepository,
        ArticleService,
        ArticleRepository
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    repository = module.get<Repository<Comment>>(
      getRepositoryToken(Comment),
    );
    userService = module.get<UserService>(UserService);
    articleService = module.get<ArticleService>(ArticleService);
    repositorySaveSpy = jest.spyOn(repository,'save');
    repositoryFindSpy = jest.spyOn(repository,'find');
    repositoryFindOneSpy = jest.spyOn(repository,'findOne');
    repositorySoftDeleteSpy = jest.spyOn(repository,'softDelete');
    userServiceFindOneSpy = jest.spyOn(userService,'findOne');
    articleServiceFindOneSpy = jest.spyOn(articleService,'findOne');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const saveMockError = 'saveMockError';
    beforeEach(() => {
      userServiceFindOneSpy.mockResolvedValueOnce(mockUser);
      articleServiceFindOneSpy.mockResolvedValueOnce(mockArticle);
    })

    it("should call repository's save method with right params", async () => {
      await expect(service.create(createCommentDto))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(userServiceFindOneSpy).toBeCalledWith(
            createCommentDto.authorId,
          );
          expect(articleServiceFindOneSpy).toBeCalledWith(
            createCommentDto.articleId,
          );
          expect(repositorySaveSpy).toBeCalledWith(
            new Comment(mockUser, mockArticle, createCommentDto.content),
          );
        });
    });
    it('should throw an error when save throws an error', async () => {
      repositorySaveSpy.mockRejectedValueOnce(saveMockError);
      await expect(service.create(createCommentDto)).rejects.toBe(saveMockError);
    });
  });

  describe('addUpVote', () => {
    it('add upvoter user to list of upvoters & save', async () => {
      await expect(service.addUpVote(mockCommentId, upVoteCommentDto)).resolves.toMatchSnapshot().then(() => {
        expect(repositorySaveSpy).toBeCalledWith(mockComment);
      })
    })
  })

  describe('removeUpVote', () => {
    it('removes upvoter user to list of upvoters & save', async () => {
      await expect(service.removeUpVote(mockCommentId, upVoteCommentDto)).resolves.toMatchSnapshot().then(() => {
        expect(repositorySaveSpy).toBeCalledWith(mockComment);
      })
    })
  })
});
