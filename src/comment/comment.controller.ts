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
import { CommentService } from "src/adapters/sunbirdrc/comment.adapter";
@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Comment detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getComments(@Param("id") commentId: string, @Req() request: Request) {
    return this.service.getComment(commentId, request);
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
    return this.service.createComment(request, commentDto);
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
    return await this.service.updateComment(commentId, request, commentDto);
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
    return await this.service.searchComment(request, CommentSearchDto);
  }
}
