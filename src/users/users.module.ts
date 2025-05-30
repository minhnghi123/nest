import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middlewares/users/users.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/typeorm/entities/User.entity';
import { Post } from '@/typeorm/entities/Post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.ALL,
    });
  }
}
