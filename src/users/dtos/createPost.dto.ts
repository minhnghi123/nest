import { IsNotEmpty, IsInt, IsNumber } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNumber()
  userId: number;
}
