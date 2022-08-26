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
  Inject,
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
import {
  SunbirdCommentService,
  SunbirdCommentToken,
} from "src/adapters/sunbirdrc/comment.adapter";
import { HasuraCommentToken } from "src/adapters/hasura/comment.adapter";
import { IServicelocator } from "src/adapters/commentservicelocator";
@ApiTags("Comment")
@Controller("comment")
export class CommentController implements IServicelocator {
  constructor(
    @Inject(SunbirdCommentToken)
    private sunbirdProvider: IServicelocator,
    @Inject(HasuraCommentToken)
    private hasuraProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Comment detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getComment(@Param("id") commentId: string, @Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getComment(commentId, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.getComment(commentId, request);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.createComment(request, commentDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.createComment(request, commentDto);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.updateComment(commentId, request, commentDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.updateComment(commentId, request, commentDto);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.searchComment(request, CommentSearchDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.searchComment(request, CommentSearchDto);
    }
  }
}
