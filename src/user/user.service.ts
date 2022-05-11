import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(
      new User(
        createUserDto?.firstName,
        createUserDto?.lastName,
        createUserDto?.displayPicture,
      ),
    );
  }

  findAll(findAllUserDto: FindAllUserDto): Promise<Array<User>> {
    const { limit = 10, offset = 0} = findAllUserDto
    return this.userRepository.find({
      order: {
        lastModifiedDate: 'ASC',
      },
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.keys(updateUserDto).forEach( key => {
      if(updateUserDto[key]){
        user[key] = updateUserDto[key];
      }
    })
    return this.userRepository.save(user);
  }

  remove(id: string): Promise<UpdateResult> {
    return this.userRepository.softDelete({ id });
  }
}
