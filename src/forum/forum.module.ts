import { Module } from '@nestjs/common';
import { DiscussionController } from './controller/discussion/discussion.controller';
import { DiscussionService } from './service/discussion/discussion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/typeorm/entity/Comments';
import { Discussions } from 'src/typeorm/entity/Discussion';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './service/comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Discussions])],
  controllers: [DiscussionController, CommentsController],
  providers: [DiscussionService, CommentsService],
})
export class ForumModule {}
