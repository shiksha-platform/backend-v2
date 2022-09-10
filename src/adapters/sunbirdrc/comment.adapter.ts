import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { CommentDto } from "src/comment/dto/comment.dto";
import { CommentSearchDto } from "src/comment/dto/comment-search.dto";
import jwt_decode from "jwt-decode";
import { IServicelocator } from "../commentservicelocator";
export const SunbirdCommentToken = "SunbirdComment";
@Injectable()
export class SunbirdCommentService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Comment`;
  userUrl = `${process.env.BASEAPIURL}/User`;

  public async getComment(commentId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${commentId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          let data = [axiosResponse.data];

          const commentDto = await this.mappedResponse(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: commentDto[0],
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response?.status,
            errorMessage: e.response?.data?.params?.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }
  public async createComment(request: any, commentDto: CommentDto) {
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let email = decoded.email;
    let axios = require("axios");
    let data = {
      filters: {
        email: {
          eq: `${email}`,
        },
      },
    };
    let config = {
      method: "post",
      url: `${this.userUrl}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    const result = response.data[0];
    commentDto.userId = result.osid;

    return this.httpService
      .post(`${this.url}`, commentDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "Ok.",
            data: axiosResponse.data,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response?.status,
            errorMessage: e.response?.data?.params?.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }

  public async updateComment(
    commentId: string,
    request: any,
    commentDto: CommentDto
  ) {
    var axios = require("axios");
    var data = commentDto;
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
    const result = userResponse.data[0];
    commentDto.userId = result.osid;

    var config = {
      method: "put",
      url: `${this.url}/${commentId}`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    return new SuccessResponse({
      statusCode: 200,
      message: " Ok.",
      data: response.data,
    });
  }

  public async searchComment(request: any, commentSearchDto: CommentSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, commentSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (response) => {
          const responsedata = response.data;
          const commentDto = await this.mappedResponse(responsedata);
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: commentDto,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response.status,
            errorMessage: e.response.data.params.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }
  public async mappedResponse(result: any) {
    const commentResponse = result.map((obj: any) => {
      const commentMapping = {
        commentId: obj?.osid ? `${obj.osid}` : "",
        contextId: obj?.contextId ? `${obj.contextId}` : "",
        context: obj?.context ? `${obj.context}` : "",
        userId: obj?.userId ? `${obj.userId}` : "",
        comment: obj?.comment ? `${obj.comment}` : "",
        privacy: obj?.privacy ? `${obj.privacy}` : "",
        parentId: obj?.parentId ? `${obj.parentId}` : "",
        status: obj?.status ? `${obj.status}` : "",
        createdAt: obj?.osCreatedAt ? `${obj.osCreatedAt}` : "",
        updatedAt: obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "",
        createdBy: obj?.osCreatedBy ? `${obj.osCreatedBy}` : "",
        updatedBy: obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "",
      };
      return new CommentDto(commentMapping);
    });

    return commentResponse;
  }
}
