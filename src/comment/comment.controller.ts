import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  CacheInterceptor,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { CommentDto } from "./dto/comment.dto";
import { CommentSearchDto } from "./dto/comment-search.dto";
import { IServicelocator } from "src/adapters/commentservicelocator";
import { CommentAdapter } from "./commentadapter";
@ApiTags("Comment")
@Controller("comment")
export class CommentController implements IServicelocator {
  constructor(private commentAdapter: CommentAdapter) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Comment detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getComment(@Param("id") commentId: string, @Req() request: Request) {
    return this.commentAdapter
      .buildCommentAdapter()
      .getComment(commentId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Comment has been created successfully.",
  })
  @ApiBody({ type: CommentDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createComment(
    @Req() request: Request,
    @Body() commentDto: CommentDto
  ) {
    return this.commentAdapter
      .buildCommentAdapter()
      .createComment(request, commentDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Comment has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateComment(
    @Param("id") commentId: string,
    @Req() request: Request,
    @Body() commentDto: CommentDto
  ) {
    return this.commentAdapter
      .buildCommentAdapter()
      .updateComment(commentId, request, commentDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Comment list." })
  @ApiBody({ type: CommentSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchComment(
    @Req() request: Request,
    @Body() CommentSearchDto: CommentSearchDto
  ) {
    return this.commentAdapter
      .buildCommentAdapter()
      .searchComment(request, CommentSearchDto);
  }
}
