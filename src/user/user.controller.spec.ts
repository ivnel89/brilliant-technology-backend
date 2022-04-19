import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createUserDto, findAllUserDto, mockUserId, updateUserDto } from './test/user.dto.mock';
import { UserRepository } from './test/user.repository.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let serviceCreateSpy,
    serviceFindAllSpy,
    serviceFindOneSpy,
    serviceUpdateSpy,
    serviceRemoveSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserRepository
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    serviceCreateSpy = jest.spyOn(service, 'create');
    serviceFindAllSpy = jest.spyOn(service, 'findAll'); 
    serviceFindOneSpy = jest.spyOn(service, 'findOne'); 
    serviceUpdateSpy = jest.spyOn(service, 'update'); 
    serviceRemoveSpy = jest.spyOn(service, 'remove');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const serviceCreateError = "serviceCreateError";
    it('should call create from userService with right params', async () => {
      await expect(controller.create(createUserDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceCreateSpy).toBeCalledWith(createUserDto);
      })
    })
    it('should validate createUserDto', async () => { 
      const invalidInput = new CreateUserDto();
      invalidInput.displayPicture = 'notAnUrl';
      invalidInput.firstName = 999 as any;
      const errors = await validate(plainToInstance(CreateUserDto,invalidInput))
      expect(errors.length).toBe(3)
    })
    it('should throw an error when create from userService throws an error', async () => {
      serviceCreateSpy.mockRejectedValueOnce(serviceCreateError);
      await expect(controller.create(createUserDto)).rejects.toBe(
        serviceCreateError,
      );
    })
  })

  describe('findAll', () => {
    const serviceFindAllError = "serviceFindAllError";
    it('should call findAll from userService with right params', async () => {
      await expect(controller.findAll(findAllUserDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceFindAllSpy).toBeCalledWith(findAllUserDto);
      })
    })
    it('should validate findAllUserDto', async () => { 
      const invalidInput = new FindAllUserDto();
      invalidInput.limit = NaN;
      invalidInput.offset = "twentyTwo" as any;
      const errors = await validate(plainToInstance(FindAllUserDto,invalidInput))
      expect(errors.length).toBe(2)
    })
    it('should throw an error when findAll from userService throws an error', async () => {
      serviceFindAllSpy.mockRejectedValueOnce(serviceFindAllError);
      await expect(controller.findAll(findAllUserDto)).rejects.toBe(
        serviceFindAllError,
      );
    })
  })

  describe('findOne', () => {
    const serviceFindOneError = "serviceFindOneError";
    it('should call findOne from userService with right params', async () => {
      await expect(controller.findOne(mockUserId)).resolves.toMatchSnapshot().then(() => {
        expect(serviceFindOneSpy).toBeCalledWith(mockUserId);
      })
    })
    it('should throw an error when findOne from userService throws an error', async () => {
      serviceFindOneSpy.mockRejectedValueOnce(serviceFindOneError);
      await expect(controller.findOne(mockUserId)).rejects.toBe(
        serviceFindOneError,
      );
    })
  })

  describe('update', () => {
    const serviceUpdateError = "serviceUpdateError";
    it('should call update from userService with right params', async () => {
      await expect(controller.update(mockUserId,updateUserDto)).resolves.toMatchSnapshot().then(() => {
        expect(serviceUpdateSpy).toBeCalledWith(mockUserId,updateUserDto);
      })
    })
    it('should validate updateUserDto', async () => { 
      const invalidInput = new UpdateUserDto();
      invalidInput.displayPicture = 'notAnUrl';
      invalidInput.firstName = 999 as any;
      const errors = await validate(plainToInstance(UpdateUserDto,invalidInput))
      expect(errors.length).toBe(2)
    })
    it('should throw an error when create from userService throws an error', async () => {
      serviceUpdateSpy.mockRejectedValueOnce(serviceUpdateError);
      await expect(controller.update(mockUserId, updateUserDto)).rejects.toBe(
        serviceUpdateError,
      );
    })
  })

  describe('remove', () => {
    const serviceRemoveError = "serviceRemoveError";
    it('should call remove from userService with right params', async () => {
      await expect(controller.remove(mockUserId)).resolves.toMatchSnapshot().then(() => {
        expect(serviceRemoveSpy).toBeCalledWith(mockUserId);
      })
    })
    it('should throw an error when remove from userService throws an error', async () => {
      serviceRemoveSpy.mockRejectedValueOnce(serviceRemoveError);
      await expect(controller.remove(mockUserId)).rejects.toBe(
        serviceRemoveError,
      );
    })
  })

});
