import { CommentSearchDto } from "src/comment/dto/comment-search.dto";
import { CommentDto } from "src/comment/dto/comment.dto";

export interface IServicelocator {
  getComment(commentId: string, request: any);
  createComment(request: any, commentDto: CommentDto);
  updateComment(commentId: string, request: any, commentDto: CommentDto);
  searchComment(request: any, commentSearchDto: CommentSearchDto);
}
