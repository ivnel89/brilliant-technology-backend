import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { createUserDto, findAllUserDto, mockUserId, updateUserDto } from './test/user.dto.mock';
import { mockUser, UserRepository } from './test/user.repository.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let repositorySaveSpy, repositoryFindSpy, repositoryFindOneSpy, repositorySoftDeleteSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(
      getRepositoryToken(User),
    );
    repositorySaveSpy = jest.spyOn(repository,'save');
    repositoryFindSpy = jest.spyOn(repository,'find');
    repositoryFindOneSpy = jest.spyOn(repository,'findOne');
    repositorySoftDeleteSpy= jest.spyOn(repository,'softDelete');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const saveMockError = 'saveMockError';

    it("should call repository's save method with right params", async () => {
      await expect(service.create(createUserDto))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(repositorySaveSpy).toBeCalledWith(
            new User(
              createUserDto.firstName,
              createUserDto.lastName,
              createUserDto.displayPicture,
            ),
          );
        });
    });

    it('should throw an error when save throws an error', async () => {
      repositorySaveSpy.mockRejectedValueOnce(saveMockError);
      await expect(service.create(createUserDto)).rejects.toBe(saveMockError);
    });
  });

  describe('findAll', () => {
    const findMockError = 'findMockError';

    it("should call repository's find method with right params", async () => {
      await expect(service.findAll(findAllUserDto))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(repositoryFindSpy).toBeCalledWith({
            order: {
              lastModifiedDate: 'ASC',
            },
            skip: findAllUserDto.offset,
            take: findAllUserDto.limit,
          });
        });
    });

    it('should throw an error when find throws an error', async () => {
      repositoryFindSpy.mockRejectedValueOnce(findMockError);
      await expect(service.findAll(findAllUserDto)).rejects.toBe(findMockError);
    });
  });

  describe('findOne', () => {
    const findOneMockError = 'findOneMockError';

    it("should call repository's findOne method with right params", async () => {
      await expect(service.findOne(mockUserId))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(repositoryFindOneSpy).toBeCalledWith({
            where: {
              id: mockUserId,
            },
          });
        });
    });

    it('should throw an error when findOne throws an error', async () => {
      repositoryFindOneSpy.mockRejectedValueOnce(findOneMockError);
      await expect(service.findOne(mockUserId)).rejects.toBe(findOneMockError);
    });
  });

  describe('update', () =>  {

    const saveMockError = 'saveMockError';

    beforeEach(() => {
      repositoryFindOneSpy.mockResolvedValueOnce(mockUser);
    })

    it('should call repository\'s save & findOne method with right params', async () => {      
      await expect(service.update(mockUserId,updateUserDto))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(repositoryFindOneSpy).toBeCalledWith({
            where: {
              id: mockUserId,
            },
          });
          expect(repositorySaveSpy).toBeCalledWith(
            new User(
              mockUser.firstName,
              updateUserDto.lastName,
              mockUser.displayPicture,
            ),
          );
        });
    })

    it('should throw an error when save throws an error', async () => {
      repositorySaveSpy.mockRejectedValueOnce(saveMockError);
      await expect(service.update(mockUserId,updateUserDto)).rejects.toBe(saveMockError);
    })
  })

  describe('remove', () => {
    const softDeleteMockError = "softDeleteMockError"
    it('should call repository\'s softDelete method with right params', async () => {      
      await expect(service.remove(mockUserId))
        .resolves.toMatchSnapshot()
        .then(() => {
          expect(repositorySoftDeleteSpy).toBeCalledWith({
            id: mockUserId,
          });
        });
    })
    it('should throw an error when softDelete throws an error', async () => {
      repositorySoftDeleteSpy.mockRejectedValueOnce(softDeleteMockError);
      await expect(service.remove(mockUserId)).rejects.toBe(
        softDeleteMockError,
      );
    });
  })

});
