import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUpvoteParams } from 'src/forum/utils/types';
import { Comments } from 'src/typeorm/entity/Comments';
import { Discussions } from 'src/typeorm/entity/Discussion';
import { Upvote } from 'src/typeorm/entity/Upvote';
import { Repository } from 'typeorm';

@Injectable()
export class UpvoteService {
  constructor(
    @InjectRepository(Upvote) private upvoteRepo: Repository<Upvote>,
    @InjectRepository(Discussions)
    private discussionRepo: Repository<Discussions>,
    @InjectRepository(Comments)
    private commentsRepo: Repository<Comments>,
  ) {}

  getAllUpvotes() {
    return this.upvoteRepo.find();
  }

  async createUpvote(upvoteParams: CreateUpvoteParams) {
    const discussionId = upvoteParams.discussionId;
    const commentId = upvoteParams.commentId;

    // Checking if Discussion or Comment is present
    if (discussionId !== undefined && discussionId !== null) {
      const discussion = await this.discussionRepo.findOneBy({
        id: discussionId,
      });

      // Check if user already upvoted
      const discussionPresent = await this.upvoteRepo.findOne({
        where: { discussion: discussion, userId: upvoteParams.userId },
      });

      if (discussionPresent) {
        throw new HttpException('User already Upvoted', HttpStatus.BAD_REQUEST);
      }

      if (discussion) {
        // If the discussion is found, create and save the upvote
        const upvote = this.upvoteRepo.create({
          userId: upvoteParams.userId,
          discussion: discussion,
          createdAt: new Date(),
        });

        return this.upvoteRepo.save(upvote);
      } else {
        // Discussion not found, handle accordingly
        throw new HttpException('Discussion not found', HttpStatus.BAD_REQUEST);
      }
    } else if (commentId !== undefined && commentId !== null) {
      const comment = await this.commentsRepo.findOneBy({ id: commentId });

      // Check if user already upvoted
      const commentPresent = await this.upvoteRepo.findOne({
        where: { discussion: comment, userId: upvoteParams.userId },
      });

      if (commentPresent) {
        throw new HttpException('User already Upvoted', HttpStatus.BAD_REQUEST);
      }

      if (comment) {
        const upvote = this.upvoteRepo.create({
          userId: upvoteParams.userId,
          comment: comment,
          createdAt: new Date(),
        });

        return this.upvoteRepo.save(upvote);
      }
    } else {
      throw new HttpException(
        'Discussion or Comment not found',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
