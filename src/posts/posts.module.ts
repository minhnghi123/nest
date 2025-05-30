import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './controller/posts/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/typeorm/entities/Post.entity';
import { User } from '@/typeorm/entities/User.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
