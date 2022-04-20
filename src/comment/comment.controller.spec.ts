import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from 'src/article/article.service';
import { ArticleRepository } from 'src/article/test/article.repository.mock';
import { UserRepository } from 'src/user/test/user.repository.mock';
import { UserService } from 'src/user/user.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './test/comment.repository.mock';
import { createCommentDto, mockCommentId, upVoteCommentDto } from './test/comment.dto.mock';
import { CreateCommentDto } from './dto/create-comment.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpVoteCommentDto } from './dto/up-vote-comment.dto';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;
  let serviceCreateSpy,
    serviceAddUpVoteSpy,
    serviceRemoveUpVoteSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        CommentRepository,
        UserService,
        UserRepository,
        ArticleService,
        ArticleRepository,
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
    serviceCreateSpy = jest.spyOn(service, 'create');
    serviceAddUpVoteSpy = jest.spyOn(service, 'addUpVote');
    serviceRemoveUpVoteSpy = jest.spyOn(service, 'removeUpVote');

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const serviceCreateError = "serviceCreateError";
    it('should call create from commentService with right params', async () => {
      await expect(controller.create(createCommentDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceCreateSpy).toBeCalledWith(createCommentDto);
      })
    })
    it('should validate createCommentDto', async () => { 
      const invalidInput = new CreateCommentDto();
      invalidInput.articleId = 999 as any;
      invalidInput.authorId = "notUUID";
      invalidInput.content = undefined;
      const errors = await validate(plainToInstance(CreateCommentDto,invalidInput))
      expect(errors.length).toBe(3)
    })
    it('should throw an error when create from commentService throws an error', async () => {
      serviceCreateSpy.mockRejectedValueOnce(serviceCreateError);
      await expect(controller.create(createCommentDto)).rejects.toBe(
        serviceCreateError,
      );
    })
  })

  describe('upVote', () => {
    const serviceUpVoteError = "serviceUpVoteError";
    it('should call upvote from commentService with right params', async () => {
      await expect(controller.addUpVote(mockCommentId,upVoteCommentDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceAddUpVoteSpy).toBeCalledWith(mockCommentId,upVoteCommentDto);
      })
    })
    it('should validate upVoteCommentDto', async () => { 
      const invalidInput = new UpVoteCommentDto();
      invalidInput.userId = 999 as any;
      const errors = await validate(plainToInstance(UpVoteCommentDto,invalidInput))
      expect(errors.length).toBe(1)
    })
    it('should throw an error when upvote from commentService throws an error', async () => {
      serviceAddUpVoteSpy.mockRejectedValueOnce(serviceUpVoteError);
      await expect(
        controller.addUpVote(mockCommentId, upVoteCommentDto),
      ).rejects.toBe(serviceUpVoteError);
    })
  })

  describe('removeVote', () => {
    const serviceRemoveVoteError = "serviceRemoveVoteError";
    it('should call removeUpvote from commentService with right params', async () => {
      await expect(controller.removeUpVote(mockCommentId,upVoteCommentDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceRemoveUpVoteSpy).toBeCalledWith(mockCommentId,upVoteCommentDto);
      })
    })
    it('should validate upVoteCommentDto', async () => { 
      const invalidInput = new UpVoteCommentDto();
      invalidInput.userId = 999 as any;
      const errors = await validate(plainToInstance(UpVoteCommentDto,invalidInput))
      expect(errors.length).toBe(1)
    })
    it('should throw an error when removeUpvote from commentService throws an error', async () => {
      serviceRemoveUpVoteSpy.mockRejectedValueOnce(serviceRemoveVoteError);
      await expect(
        controller.removeUpVote(mockCommentId, upVoteCommentDto),
      ).rejects.toBe(serviceRemoveVoteError);
    })
  })

});
