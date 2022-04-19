import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockUser, UserRepository } from 'src/user/test/user.repository.mock';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { createArticleDto, findAllArticleDto, mockArticleId } from './test/article.dto.mock';
import { ArticleRepository } from './test/article.repository.mock';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: Repository<Article>;
  let userService: UserService;
  let repositorySaveSpy, repositoryFindSpy, repositoryFindOneSpy;
  let userServiceFindOneSpy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        ArticleRepository,
        UserService,
        UserRepository
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    repository = module.get<Repository<Article>>(
      getRepositoryToken(Article),
    );
    userService = module.get<UserService>(UserService);
    repositorySaveSpy = jest.spyOn(repository,'save');
    repositoryFindSpy = jest.spyOn(repository,'find');
    repositoryFindOneSpy = jest.spyOn(repository,'findOne');
    userServiceFindOneSpy = jest.spyOn(userService,'findOne');

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const saveMockError = 'saveMockError';

    beforeEach(() => {
      userServiceFindOneSpy.mockResolvedValueOnce(mockUser);
    })

    it("should call repository's save method with right params", async () => {
      await expect(service.create(createArticleDto))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(userServiceFindOneSpy).toBeCalledWith(createArticleDto.authorId)
          expect(repositorySaveSpy).toBeCalledWith(
            new Article(
              mockUser,
              createArticleDto.content
            ),
          );
        });
    });

    it('should throw an error when save throws an error', async () => {
      repositorySaveSpy.mockRejectedValueOnce(saveMockError);
      await expect(service.create(createArticleDto)).rejects.toBe(saveMockError);
    });
  });

  describe('findAll', () => {
    const findMockError = 'findMockError';

    it("should call repository's find method with right params", async () => {
      await expect(service.findAll(findAllArticleDto))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(repositoryFindSpy).toBeCalledWith({
            order: {
              lastModifiedDate: 'ASC',
            },
            skip: findAllArticleDto.offset,
            take: findAllArticleDto.limit,
          });
        });
    });

    it('should throw an error when find throws an error', async () => {
      repositoryFindSpy.mockRejectedValueOnce(findMockError);
      await expect(service.findAll(findAllArticleDto)).rejects.toBe(findMockError);
    });
  });

  describe('findOne', () => {
    const findOneMockError = 'findOneMockError';

    it("should call repository's findOne method with right params", async () => {
      await expect(service.findOne(mockArticleId))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(repositoryFindOneSpy).toBeCalledWith({
            where: {
              id: mockArticleId,
            },
          });
        });
    });

    it('should throw an error when findOne throws an error', async () => {
      repositoryFindOneSpy.mockRejectedValueOnce(findOneMockError);
      await expect(service.findOne(mockArticleId)).rejects.toBe(findOneMockError);
    });
  });
});
