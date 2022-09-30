import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { LikeDto } from "src/like/dto/like.dto";
import { LikeSearchDto } from "src/like/dto/like-search.dto";
import jwt_decode from "jwt-decode";
import { IServicelocator } from "../likeservicelocator";
export const SunbirdLikeToken = "SunbirdLike";
@Injectable()
export class SunbirdLikeService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Like`;
  userUrl = `${process.env.BASEAPIURL}/User`;

  public async getLike(likeId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${likeId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          let data = [axiosResponse.data];
          const likeDto = await this.mappedResponse(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: likeDto[0],
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
  public async createLike(request: any, likeDto: LikeDto) {
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
    likeDto.userId = result.osid;
    return this.httpService
      .post(`${this.url}`, likeDto, {
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

  public async updateLike(likeId: string, request: any, likeDto: LikeDto) {
    var axios = require("axios");
    var data = likeDto;
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
    data.userId = result.osid;

    var config = {
      method: "put",
      url: `${this.url}/${likeId}`,
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

  public async searchLike(request: any, likeSearchDto: LikeSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, likeSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (response) => {
          const responsedata = response.data;
          const likeDto = await this.mappedResponse(responsedata);
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: likeDto,
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

  public async getCountLike(contextId: string, context: string, request: any) {
    let axios = require("axios");
    let data = {
      filters: {
        contextId: {
          eq: `${contextId}`,
        },
        context: {
          eq: `${context}`,
        },
      },
    };

    let config = {
      method: "post",
      url: `${this.url}/search`,

      data: data,
    };

    const response = await axios(config);
    let resData = response?.data;
    const likeDto = await this.mappedResponse(resData);
    return new SuccessResponse({
      statusCode: 200,
      message: " Ok.",
      data: likeDto.length,
    });
  }

  public async deleteLike(likeId: string, request: any) {
    return this.httpService
      .delete(`${this.url}/${likeId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: data,
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

  public async mappedResponse(result: any) {
    const likeResponse = result.map((obj: any) => {
      const likeMapping = {
        likeId: obj?.osid ? `${obj.osid}` : "",
        contextId: obj?.contextId ? `${obj.contextId}` : "",
        context: obj?.context ? `${obj.context}` : "",
        userId: obj?.userId ? `${obj.userId}` : "",
        type: obj?.type ? `${obj.type}` : "",
        createdAt: obj?.osCreatedAt ? `${obj.osCreatedAt}` : "",
        updatedAt: obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "",
        createdBy: obj?.osCreatedBy ? `${obj.osCreatedBy}` : "",
        updatedBy: obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "",
      };
      return new LikeDto(likeMapping);
    });

    return likeResponse;
  }
}
