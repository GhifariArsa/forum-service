import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDiscussionDto } from 'src/forum/dto/CreateDiscussion.dto';
import { DiscussionService } from 'src/forum/service/discussion/discussion.service';

@Controller('v1/discussion')
export class DiscussionController {
  constructor(private discussionService: DiscussionService) {}

  @Get()
  getAllDiscussions() {
    return this.discussionService.getAllDiscussion();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createDiscussion(@Body() createDiscussionDto: CreateDiscussionDto) {
    return this.discussionService.createDiscussion(createDiscussionDto);
  }

  @Get(':id/upvote')
  getUpvotesDiscussion(@Param('id', ParseIntPipe) id: number) {
    return this.discussionService.getNumberOfUpvotes(id);
  }
}
