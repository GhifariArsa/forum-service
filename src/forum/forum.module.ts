import { Module } from '@nestjs/common';
import { DiscussionController } from './controller/discussion/discussion.controller';
import { DiscussionService } from './service/discussion/discussion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/typeorm/entity/Comments';
import { Discussions } from 'src/typeorm/entity/Discussion';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './service/comments/comments.service';
import { Upvote } from 'src/typeorm/entity/Upvote';
import { UpvoteController } from './controller/upvote/upvote.controller';
import { UpvoteService } from './service/upvote/upvote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Discussions, Upvote])],
  controllers: [DiscussionController, CommentsController, UpvoteController],
  providers: [DiscussionService, CommentsService, UpvoteService],
})
export class ForumModule {}
