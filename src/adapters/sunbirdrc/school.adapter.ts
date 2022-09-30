import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { catchError, map } from "rxjs";
import { SchoolDto } from "src/school/dto/school.dto";
import { SchoolSearchDto } from "src/school/dto/school-search.dto";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { IServicelocator } from "../schoolservicelocator";
export const SunbirdSchoolToken = "SunbirdSchool";
@Injectable()
export class SchoolService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/School`;

  public async getSchool(id: any, request: any) {
    return this.httpService
      .get(`${this.url}/${id}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const schoolDto = await this.mappedResponse(data);
          return new SuccessResponse({
            statusCode: 200,
            message: " Ok.",
            data: schoolDto[0],
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

  public async createSchool(request: any, schoolDto: SchoolDto) {
    return this.httpService
      .post(`${this.url}`, schoolDto, {
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

  public async updateSchool(id: string, request: any, schoolDto: SchoolDto) {
    var axios = require("axios");
    var data = schoolDto;

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

  public async searchSchool(request: any, schoolSearchDto: SchoolSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, schoolSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (response) => {
          const responsedata = response.data;
          const schoolDto = await this.mappedResponse(responsedata);
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: schoolDto,
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
    const schoolResponse = result.map((item: any) => {
      const schoolMapping = {
        schoolId: item?.osid ? `${item.osid}` : "",
        schoolName: item?.schoolName ? `${item.schoolName}` : "",
        email: item?.email ? `${item.email}` : "",
        udise: item?.udise ? `${item.udise}` : "",
        mediumOfInstruction: item?.mediumOfInstruction
          ? item.mediumOfInstruction
          : "",
        phoneNumber: item?.phoneNumber ? item.phoneNumber : "",
        address: item?.address ? item.address : "",
        schoolType: item?.schoolType ? `${item.schoolType}` : "",
        website: item?.website ? `${item.website}` : "",
        headMaster: item?.headMaster ? `${item.headMaster}` : "",
        board: item?.board ? `${item.board}` : "",
        village: item?.village ? `${item.village}` : "",
        block: item?.block ? `${item.block}` : "",
        district: item?.district ? `${item.district}` : "",
        stateId: item?.stateId ? `${item.stateId}` : "",
        cluster: item?.cluster ? `${item.cluster}` : "",
        pincode: item?.pincode ? item.pincode : "",
        locationId: item?.locationId ? `${item.locationId}` : "",
        enrollCount: item?.enrollCount ? `${item.enrollCount}` : "",
        status: item?.status ? `${item.status}` : "",
        latitude: item?.latitude ? item.latitude : "",
        longitude: item?.longitude ? item.longitude : "",
        metaData: item?.metaData ? item.metaData : [],
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new SchoolDto(schoolMapping);
    });

    return schoolResponse;
  }
}
