import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserType } from './models/user.model';
import { User } from './entities/User';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<ResponseUserType> {
    const newUser = new User(createUserDto.login, createUserDto.password);
    const user = await this.prisma.user.create({
      data: newUser,
    });
    return User.getUserInfo(user);
  }

  public async findAll(): Promise<Array<ResponseUserType>> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => User.getUserInfo(user));
  }

  public async findOne(id: string): Promise<ResponseUserType> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return user;
    return User.getUserInfo(user);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserType | boolean> {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!currentUser) return currentUser;
    else {
      const updatedUser = User.updatePassword(currentUser, updateUserDto);
      if (!updatedUser) return updatedUser;
      else {
        const usr = await this.prisma.user.update({
          where: { id },
          data: updatedUser,
        });
        return User.getUserInfo(usr);
      }
    }
  }

  public async remove(id: string): Promise<ResponseUserType> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) return existingUser;
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return User.getUserInfo(deletedUser);
  }
}
