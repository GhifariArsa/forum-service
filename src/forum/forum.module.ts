import { Module } from '@nestjs/common';
import { DiscussionController } from './controller/discussion/discussion.controller';

@Module({
  controllers: [DiscussionController]
})
export class ForumModule {}
