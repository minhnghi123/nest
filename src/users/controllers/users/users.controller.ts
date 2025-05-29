import {
  Controller,
  Post,
  Get,
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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { CreateUserDto } from '@/users/dtos/createUser.dto';
import { UsersService } from '@/users/services/users/users.service';
import { ValidateCreateUserPipe } from '@/users/pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from '@/users/guards/auth/auth.guard';
import { Roles } from '@/users/decorators/roles/roles.decorator';
@Controller('users')
@UseGuards(AuthGuard)
@Roles('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Roles('admin')
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getSpecificUser(@Param('id') id: string) {
    return id;
  }

  @Post('create')
  @Roles('user')
  @UsePipes(ValidateCreateUserPipe, new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    try {
      console.log('User Data:', userData);
      return this.userService.createUser(userData);
    } catch (error) {
      throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST);
    }
  }
}
