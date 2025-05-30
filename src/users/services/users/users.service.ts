import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreatePostType,
  UpdateUserType,
  UserType,
} from '@/users/types/user.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/typeorm/entities/User.entity';
import { Repository } from 'typeorm';
import { Post } from '@/typeorm/entities/Post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userResponsitory: Repository<User>,
    @InjectRepository(Post) private readonly postResponsitory: Repository<Post>,
  ) {}

  async getUsers() {
    try {
      return await this.userResponsitory.find({
        select: ['id', 'username', 'createdAt', 'authStrategy'],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createUser(userInput: UserType) {
    try {
      const newUser = await this.userResponsitory.create({
        ...userInput,
        createdAt: new Date(),
      });
      return await this.userResponsitory.save(newUser);
    } catch (error) {
      throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    }
  }
  async updateUser(id: number, updateUserData: UpdateUserType) {
    try {
      await this.userResponsitory.update(
        { id },
        {
          ...updateUserData,
        },
      );
      return {
        success: true,
        message: 'User updated successfully',
        data: await this.userResponsitory.findOne({
          where: { id },
          select: ['id', 'username', 'createdAt', 'authStrategy'],
        }),
      };
    } catch (error) {
      throw new HttpException('User update failed', HttpStatus.BAD_REQUEST);
    }
  }
  async createPost(userId: number, postData: CreatePostType) {
    try {
      const user = await this.userResponsitory.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const newPost = this.postResponsitory.create({
        ...postData,
        user,
      });
      return await this.postResponsitory.save(newPost);
    } catch (error) {
      throw new HttpException('Post creation failed', HttpStatus.BAD_REQUEST);
    }
  }
}
