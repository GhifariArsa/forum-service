import {
  Body,
  Controller,
  Get,
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
}
