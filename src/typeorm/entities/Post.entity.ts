import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';
@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
