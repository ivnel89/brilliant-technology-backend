import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserRepository } from 'src/user/test/user.repository.mock';
import { UserService } from 'src/user/user.service';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { createArticleDto, findAllArticleDto, findOneArticleDto, mockArticleId } from './test/article.dto.mock';
import { ArticleRepository } from './test/article.repository.mock';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;
  let serviceCreateSpy,
    serviceFindAllSpy,
    serviceFindOneSpy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        ArticleService,
        ArticleRepository,
        UserService,
        UserRepository,
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
    serviceCreateSpy = jest.spyOn(service, 'create');
    serviceFindAllSpy = jest.spyOn(service, 'findAll'); 
    serviceFindOneSpy = jest.spyOn(service, 'findOne'); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const serviceCreateError = "serviceCreateError";
    it('should call create from articleService with right params', async () => {
      await expect(controller.create(createArticleDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceCreateSpy).toBeCalledWith(createArticleDto);
      })
    })
    it('should validate createArticleDto', async () => { 
      const invalidInput = new CreateArticleDto();
      invalidInput.authorId = 999 as any;
      invalidInput.content = undefined;
      const errors = await validate(plainToInstance(CreateArticleDto,invalidInput))
      expect(errors.length).toBe(2)
    })
    it('should throw an error when create from articleService throws an error', async () => {
      serviceCreateSpy.mockRejectedValueOnce(serviceCreateError);
      await expect(controller.create(createArticleDto)).rejects.toBe(
        serviceCreateError,
      );
    })
  })

  describe('findAll', () => {
    const serviceFindAllError = "serviceFindAllError";
    it('should call findAll from articleService with right params', async () => {
      await expect(controller.findAll(findAllArticleDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceFindAllSpy).toBeCalledWith(findAllArticleDto);
      })
    })
    it('should validate findAllArticleDto', async () => { 
      const invalidInput = new FindAllArticleDto();
      invalidInput.limit = NaN;
      invalidInput.offset = "twentyTwo" as any;
      const errors = await validate(plainToInstance(FindAllArticleDto,invalidInput))
      expect(errors.length).toBe(2)
    })
    it('should throw an error when findAll from articleService throws an error', async () => {
      serviceFindAllSpy.mockRejectedValueOnce(serviceFindAllError);
      await expect(controller.findAll(findAllArticleDto)).rejects.toBe(
        serviceFindAllError,
      );
    })
  })

  describe('findOne', () => {
    const serviceFindOneError = "serviceFindOneError";
    it('should call findOne from articleService with right params', async () => {
      await expect(controller.findOne(mockArticleId, findOneArticleDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceFindOneSpy).toBeCalledWith(mockArticleId);
      })
    })
    it('should throw an error when findOne from articleService throws an error', async () => {
      serviceFindOneSpy.mockRejectedValueOnce(serviceFindOneError);
      await expect(controller.findOne(mockArticleId, findOneArticleDto)).rejects.toBe(
        serviceFindOneError,
      );
    })
  })
});
