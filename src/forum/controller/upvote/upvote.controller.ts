import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUpvoteDto } from 'src/forum/dto/CreateUpvote.dto';
import { UpvoteService } from 'src/forum/service/upvote/upvote.service';

@Controller('v1/upvote')
export class UpvoteController {
  constructor(private upvoteService: UpvoteService) {}

  @Get()
  getAllUpvotes() {
    return this.upvoteService.getAllUpvotes();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUpvote(@Body() upvoteDto: CreateUpvoteDto) {
    return this.upvoteService.createUpvote(upvoteDto);
  }
}
