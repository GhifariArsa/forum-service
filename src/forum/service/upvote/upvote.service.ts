import { Injectable } from '@nestjs/common';
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

    if (discussionId !== undefined && discussionId !== null) {
      // Assuming that discussionId is valid, you may want to add validation here

      const discussion = await this.discussionRepo.findOneBy({
        id: discussionId,
      });

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
        throw new Error('Discussion not found');
      }
    } else {
      // discussionId is not present in upvoteParams
      throw new Error('Discussion ID is missing in upvoteParams');
    }
  }
}
