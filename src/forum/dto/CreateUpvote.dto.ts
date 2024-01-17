import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUpvoteDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  discussionId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  commentId: number;
}
