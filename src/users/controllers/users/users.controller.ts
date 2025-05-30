import {
  Controller,
  Post,
  Get,
  Put,
  Req,
  Res,
  Body,
  Param,
  Query,
  ValidationPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  UsePipes,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { CreateUserDto } from '@/users/dtos/createUser.dto';
import { UsersService } from '@/users/services/users/users.service';
import { ValidateCreateUserPipe } from '@/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from '@/users/guards/auth/auth.guard';
import { Roles } from '@/users/decorators/roles/roles.decorator';
import { UpdateUserDto } from '@/users/dtos/updateUser.dto';
import { CreatePostDto } from '@/users/dtos/createPost.dto';
@Controller('users')
@UseGuards(AuthGuard)
@Roles('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userData: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(userData);
      return newUser;
    } catch (error) {
      throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: UpdateUserDto,
  ) {
    try {
      const update = await this.userService.updateUser(id, updateUserData);
      console.log(update);
      return update;
    } catch (error) {
      throw new HttpException('User update failed', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/:userId/create-post')
  async createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() postData: CreatePostDto,
  ) {
    try {
      const newPost = await this.userService.createPost(userId, postData);
      return newPost;
    } catch (error) {
      throw new HttpException('Post creation failed', HttpStatus.BAD_REQUEST);
    }
  }
}
