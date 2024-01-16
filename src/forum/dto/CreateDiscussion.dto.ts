import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateDiscussionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
