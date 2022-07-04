import { Injectable, HttpException, Param } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import axios, { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError, takeLast } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { SchedulerRegistry } from "@nestjs/schedule";
import jwt_decode from "jwt-decode";
import { MenuDto } from "src/menu/dto/menu.dto";
import { MenuSearchDto } from "src/menu/dto/menu-search.dto";

@Injectable()
export class MenuService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Menu`;


    public async createMenu(request: any, menuDto: MenuDto) {
        return this.httpService
        .post(`${this.url}`, menuDto, {
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
        
    public async updateMenu(
        id: string,
        request: any,
        menuDto: MenuDto
    ) {
        var axios = require("axios");
        var data = menuDto;

        var config = {
        method: "put",
        url: `${this.url}/${id}`,
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

    public async getMenu(menuId: any, request: any) {
        return this.httpService
        .get(`${this.url}/${menuId}`, {
            headers: {
            Authorization: request.headers.authorization,
            },
        })
        .pipe(
            map((axiosResponse: AxiosResponse) => {
            let data = axiosResponse.data;
            const menuDto = new MenuDto(data);
            return new SuccessResponse({
                statusCode: 200,
                message: "ok",
                data: menuDto,
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



    public async searchMenu(
        request: any,
        menuSearchDto: MenuSearchDto
      ) {
        return this.httpService
          .post(`${this.url}/search`, menuSearchDto, {
            headers: {
              Authorization: request.headers.authorization,
            },
          })
          .pipe(
            map((response) => {
              const responsedata = response.data.map(
                (item: any) => new MenuDto(item)
              );
              console.log(responsedata);
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