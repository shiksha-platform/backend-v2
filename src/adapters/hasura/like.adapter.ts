import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { LikeDto } from "src/like/dto/like.dto";
import { LikeSearchDto } from "src/like/dto/like-search.dto";
import { IServicelocator } from "../likeservicelocator";
import jwt_decode from "jwt-decode";
export const HasuraLikeToken = "HasuraLike";
@Injectable()
export class HasuraLikeService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  userUrl = `${process.env.BASEAPIURL}/User`;

  public async createLike(request: any, likeDto: LikeDto) {
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let email = decoded.email;
    let axios = require("axios");
    let userData = {
      filters: {
        email: {
          eq: `${email}`,
        },
      },
    };
    let searchData = {
      method: "post",
      url: `${this.userUrl}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: userData,
    };
    const resData = await axios(searchData);
    const resultData = resData.data[0];
    likeDto.userId = resultData.osid;
    const likeSchema = new LikeDto(likeDto);

    let query = "";
    Object.keys(likeDto).forEach((e) => {
      if (
        likeDto[e] &&
        likeDto[e] != "" &&
        Object.keys(likeSchema).includes(e)
      ) {
        if (Array.isArray(likeDto[e])) {
          query += `${e}: ${JSON.stringify(likeDto[e])}, `;
        } else {
          query += `${e}: "${likeDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateLike {
        insert_like_one(object: {${query}}) {
         likeId
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
    const result = response.data.data.insert_like_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateLike(id: string, request: any, likeDto: LikeDto) {
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
    likeDto.userId = resultData.osid;
    const likeSchema = new LikeDto(likeDto);
    let query = "";
    Object.keys(likeDto).forEach((e) => {
      if (
        likeDto[e] &&
        likeDto[e] != "" &&
        Object.keys(likeSchema).includes(e)
      ) {
        if (Array.isArray(likeDto[e])) {
          query += `${e}: ${JSON.stringify(likeDto[e])}, `;
        } else {
          query += `${e}: "${likeDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation UpdateLike($likeId:uuid) {
          update_like(where: {likeId: {_eq: $likeId}}, _set: {${query}}) {
          affected_rows
        }}`,
      variables: {
        likeId: id,
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

  public async getLike(likeId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetLike($likeId:uuid!) {
        like_by_pk(likeId: $likeId) {
            userId
            updated_at
            type
            likeId
            created_at
            contextId
            context
        }
      }
      `,
      variables: { likeId: likeId },
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
    let result = [response.data.data.like_by_pk];
    const likeDto = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: likeDto[0],
    });
  }

  public async searchLike(request: any, likeSearchDto: LikeSearchDto) {
    var axios = require("axios");

    let offset = 0;
    if (likeSearchDto.page > 1) {
      offset = parseInt(likeSearchDto.limit) * (likeSearchDto.page - 1);
    }

    let filters = likeSearchDto.filters;

    Object.keys(likeSearchDto.filters).forEach((item) => {
      Object.keys(likeSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    var data = {
      query: `query SearchLike($filters:like_bool_exp,$limit:Int, $offset:Int) {
          like(where:$filters, limit: $limit, offset: $offset,) {
            userId
            updated_at
            type
            likeId
            created_at
            contextId
            context
            }
          }`,
      variables: {
        limit: parseInt(likeSearchDto.limit),
        offset: offset,
        filters: likeSearchDto.filters,
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

    let result = response.data.data.like;
    const likeDto = await this.mappedResponse(result);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: likeDto,
    });
  }
  public async getCountLike(contextId: string, context: string, request: any) {
    var axios = require("axios");

    var data = {
      query: `query SearchLike($contextId:String,$context:String) {
          like(where: {contextId: {_eq: $contextId}, context: {_eq: $context}}) {
            userId
            updated_at
            type
            likeId
            created_at
            contextId
            context
            }
          }`,
      variables: {
        contextId: contextId,
        context: context,
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
    let result = response.data.data.like;
    const likeDto = await this.mappedResponse(result);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: likeDto.length,
    });
  }

  public async deleteLike(likeId: string, request: any) {
    var axios = require("axios");
    var data = {
      query: `mutation UpdateLike($likeId:uuid) {
              delete_like(where: {likeId: {_eq: $likeId}}) {
              affected_rows
            }}`,
      variables: {
        likeId: likeId,
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

  public async mappedResponse(result: any) {
    const likeResponse = result.map((obj: any) => {
      const likeMapping = {
        likeId: obj?.likeId ? `${obj.likeId}` : "",
        contextId: obj?.contextId ? `${obj.contextId}` : "",
        context: obj?.context ? `${obj.context}` : "",
        userId: obj?.userId ? `${obj.userId}` : "",
        type: obj?.type ? `${obj.type}` : "",
        createdAt: obj?.created_at ? `${obj.created_at}` : "",
        updatedAt: obj?.updated_at ? `${obj.updated_at}` : "",
      };
      return new LikeDto(likeMapping);
    });

    return likeResponse;
  }
}
