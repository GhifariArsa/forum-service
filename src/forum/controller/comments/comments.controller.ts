import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from 'src/forum/service/comments/comments.service';

@Controller('v1/comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get(':id')
  getCommentsForDiscussion(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getCommentsFromDiscussion(id);
  }
}
