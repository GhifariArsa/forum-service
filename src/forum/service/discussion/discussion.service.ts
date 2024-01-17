import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDiscussionParams } from 'src/forum/utils/types';
import { Discussions } from 'src/typeorm/entity/Discussion';
import { Upvote } from 'src/typeorm/entity/Upvote';
import { Repository } from 'typeorm';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Discussions)
    private discussionRepo: Repository<Discussions>,
    @InjectRepository(Upvote)
    private upvoteRepo: Repository<Upvote>,
  ) {}

  getAllDiscussion() {
    return this.discussionRepo.find();
  }

  createDiscussion(discussion: CreateDiscussionParams) {
    const newDiscussion = this.discussionRepo.create({
      title: discussion.title,
      content: discussion.content,
      createdAt: new Date(),
      userId: discussion.userId,
    });

    return this.discussionRepo.save(newDiscussion);
  }

  async getNumberOfUpvotes(discussionId: number) {
    const discussion = await this.discussionRepo.findOne({
      where: { id: discussionId },
    });
    const numUp = (
      await this.upvoteRepo.find({ where: { discussion: discussion } })
    ).length;
    return { discussion: discussion, numUpvote: numUp };
  }
}
