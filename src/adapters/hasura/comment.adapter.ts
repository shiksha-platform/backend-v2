import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../commentservicelocator";
import { CommentDto } from "src/comment/dto/comment.dto";
import { CommentSearchDto } from "src/comment/dto/comment-search.dto";
import jwt_decode from "jwt-decode";
export const HasuraCommentToken = "HasuraComment";
@Injectable()
export class HasuraCommentService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  userUrl = `${process.env.BASEAPIURL}/User`;
  public async createComment(request: any, commentDto: CommentDto) {
    var axios = require("axios");
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let email = decoded.email;

    let userData = {
      filters: {
        email: {
          eq: `${email}`,
        },
      },
    };
    let user = {
      method: "post",
      url: `${this.userUrl}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: userData,
    };
    const resData = await axios(user);
    const res = resData.data[0];
    commentDto.userId = res.osid;
    const commentSchema = new CommentDto(commentDto);
    let query = "";
    Object.keys(commentDto).forEach((e) => {
      if (
        commentDto[e] &&
        commentDto[e] != "" &&
        Object.keys(commentSchema).includes(e)
      ) {
        if (Array.isArray(commentDto[e])) {
          query += `${e}: ${JSON.stringify(commentDto[e])}, `;
        } else {
          query += `${e}: "${commentDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateComment {
        insert_comment_one(object: {${query}}) {
         commentId
        }
      }
      `,
      variables: {},
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = response.data.data.insert_comment_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateComment(id: string, request: any, commentDto: CommentDto) {
    var axios = require("axios");
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let email = decoded.email;
    let updateData = {
      filters: {
        email: {
          eq: `${email}`,
        },
      },
    };
    let configData = {
      method: "post",
      url: `${this.userUrl}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: updateData,
    };
    const userResponse = await axios(configData);
    const resultData = userResponse.data[0];
    commentDto.userId = resultData.osid;
    const commentSchema = new CommentDto(commentDto);
    let query = "";
    Object.keys(commentDto).forEach((e) => {
      if (
        commentDto[e] &&
        commentDto[e] != "" &&
        Object.keys(commentSchema).includes(e)
      ) {
        if (Array.isArray(commentDto[e])) {
          query += `${e}: ${JSON.stringify(commentDto[e])}, `;
        } else {
          query += `${e}: "${commentDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation UpdateComment($commentId:uuid) {
          update_comment(where: {commentId: {_eq: $commentId}}, _set: {${query}}) {
          affected_rows
        }}`,
      variables: {
        commentId: id,
      },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    const result = response.data.data;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async getComment(commentId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetComment($commentId:uuid!) {
        comment_by_pk(commentId: $commentId) {
            comment
            commentId
            context
            contextId
            created_at
            parentId
            privacy
            status
            updated_at
            userId
        }
      }
      `,
      variables: { commentId: commentId },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = await this.mappedResponse([
      response.data.data.comment_by_pk,
    ]);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result[0],
    });
  }

  public async searchComment(request: any, commentSearchDto: CommentSearchDto) {
    var axios = require("axios");

    let offset = 0;
    if (commentSearchDto.page > 1) {
      offset = parseInt(commentSearchDto.limit) * (commentSearchDto.page - 1);
    }

    let filters = commentSearchDto.filters;

    Object.keys(commentSearchDto.filters).forEach((item) => {
      Object.keys(commentSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    var data = {
      query: `query SearchComment($filters:comment_bool_exp,$limit:Int, $offset:Int) {
          comment(where:$filters, limit: $limit, offset: $offset,) {
            comment
            commentId
            context
            contextId
            created_at
            parentId
            privacy
            status
            updated_at
            userId
            }
          }`,
      variables: {
        limit: parseInt(commentSearchDto.limit),
        offset: offset,
        filters: commentSearchDto.filters,
      },
    };
    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    const result = await this.mappedResponse(response.data.data.comment);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async mappedResponse(result: any) {
    const commentResponse = result.map((obj: any) => {
      const commentMapping = {
        commentId: obj?.commentId ? `${obj.commentId}` : "",
        contextId: obj?.contextId ? `${obj.contextId}` : "",
        context: obj?.context ? `${obj.context}` : "",
        userId: obj?.userId ? `${obj.userId}` : "",
        comment: obj?.comment ? `${obj.comment}` : "",
        privacy: obj?.privacy ? `${obj.privacy}` : "",
        parentId: obj?.parentId ? `${obj.parentId}` : "",
        status: obj?.status ? `${obj.status}` : "",
        createdAt: obj?.created_at ? `${obj.created_at}` : "",
        updatedAt: obj?.updated_at ? `${obj.updated_at}` : "",
      };
      return new CommentDto(commentMapping);
    });

    return commentResponse;
  }
}
