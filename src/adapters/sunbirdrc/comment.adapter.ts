import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { CommentDto } from "src/comment/dto/comment.dto";
import { CommentSearchDto } from "src/comment/dto/comment-search.dto";

@Injectable()
export class CommentService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Comment`;

  public async getComment(commentId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${commentId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const commentDto = new CommentDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: commentDto,
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
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new CommentDto(item)
          );
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: responsedata,
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
}
