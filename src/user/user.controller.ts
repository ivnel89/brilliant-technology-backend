import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UserContractMapper } from './mapper/user.mapper';
import { UserContract } from './contract/user.contract';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private userContractMapper = new UserContractMapper();

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserContract> {
    const user = await this.userService
      .create(createUserDto);
    return this.userContractMapper.build(user);
  }

  @Get()
  async findAll(@Query() findAllUserDto?: FindAllUserDto): Promise<Array<UserContract>> {
    const users = await this.userService
      .findAll(findAllUserDto);
    return this.userContractMapper.buildArray(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserContract> {
    const user = await this.userService
      .findOne(id);
    return this.userContractMapper.build(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserContract> {
    const user = await this.userService
      .update(id, updateUserDto);
    return this.userContractMapper.build(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
