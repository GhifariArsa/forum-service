import { Module } from '@nestjs/common';
import { DiscussionController } from './controller/discussion/discussion.controller';
import { DiscussionService } from './service/discussion/discussion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/typeorm/entity/Comments';
import { Discussions } from 'src/typeorm/entity/Discussion';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, Discussions])],
  controllers: [DiscussionController],
  providers: [DiscussionService],
})
export class ForumModule {}
