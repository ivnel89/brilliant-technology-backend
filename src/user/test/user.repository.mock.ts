import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";

export const mockUser = new User(
    "Foo",
    "Bar",
    "www.example.com/img.png"
  )
  
  export const UserRepository = {
    provide: getRepositoryToken(User),
    useValue: {
      save: jest.fn().mockImplementation((user: User) => user),
      findOne: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn(),
      softDelete: jest.fn().mockResolvedValue("Deleted"),
      find: jest.fn().mockResolvedValue([mockUser]),
    },
  };