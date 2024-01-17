import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/typeorm/entity/Comments';
import { Discussions } from 'src/typeorm/entity/Discussion';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepo: Repository<Comments>,
    @InjectRepository(Discussions)
    private discussionRepo: Repository<Discussions>,
  ) {}

  getAllComments() {
    return this.commentRepo.find();
  }

  async getCommentsFromDiscussion(discussionId: number) {
    const discussion = await this.discussionRepo.findOne({
      where: { id: discussionId },
    });

    return this.commentRepo.find({ where: { discussion: discussion } });
  }
}
