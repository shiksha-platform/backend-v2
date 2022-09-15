import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { UserSearchDto } from "src/user/dto/user-search.dto";
import { UserDto } from "../../user/dto/user.dto";
import jwt_decode from "jwt-decode";
import { IServicelocator } from "../userservicelocator";
import { UserSegmentDto } from "src/user/dto/user-segment.dto";
export const SunbirdUserToken = "SunbirdUser";
@Injectable()
export class UserService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/User`;
  templaterURL = process.env.TEMPLATERURL;

  public async getUser(id: any, request: any) {
    return this.httpService
      .get(`${this.url}/${id}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          let data = [axiosResponse.data];

          const teacherResponse = await this.mappedResponse(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "User found Successfully",
            data: teacherResponse[0],
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

  public async createUser(request: any, teacherDto: UserDto) {
    return this.httpService
      .post(`${this.url}`, teacherDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "User created Successfully",
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

  public async updateUser(id: string, request: any, teacherDto: UserDto) {
    var axios = require("axios");
    var data = teacherDto;

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
      message: "User updated Successfully",
      data: response.data,
    });
  }
  public async searchUser(request: any, teacherSearchDto: UserSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, teacherSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (response) => {
          const responsedata = response.data;
          const teacherResponse = await this.mappedResponse(responsedata);
          return new SuccessResponse({
            statusCode: response.status,
            message: "User found Successfully",
            data: teacherResponse,
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

  public async getUserByAuth(request: any) {
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
      url: `${this.url}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    let result = response?.data && response.data;
    const teacherResponse = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: teacherResponse,
    });
  }

  public async teacherSegment(
    schoolId: string,
    templateId: string,
    request: any
  ) {
    const teacherSearchDto = {
      filters: {
        schoolId: {
          eq: `${schoolId}`,
        },
      },
    };
    var axios = require("axios");
    var getTemplate = {
      method: "get",
      url: `${this.templaterURL}${templateId}`,
    };
    const getfcmClickActionUrl = await axios(getTemplate);
    const fcmClickActionUrlData = getfcmClickActionUrl.data;
    let tagString = JSON.stringify(fcmClickActionUrlData.tag[0]);
    var jsonToObj = JSON.parse(tagString);
    let fcmClickActionUrl = JSON.parse(jsonToObj);

    let config = {
      method: "post",
      url: `${this.url}/search`,

      data: teacherSearchDto,
    };
    const response = await axios(config);
    let responseData = response.data.map((item: any) => {
      const userSegment = {
        fcmToken: item?.fcmToken ? `${item.fcmToken}` : "",
        phoneNo: item?.phoneNumber ? `${item.phoneNumber}` : "",
        name: item?.firstName ? `${item.firstName}` : "",
        fcmClickActionUrl: item?.fcmClickActionUrl
          ? `${item.fcmClickActionUrl}`
          : "",
      };
      return new UserSegmentDto(userSegment);
    });

    const teachersegment = responseData.map((obj: any) => {
      return { ...obj, fcmClickActionUrl: fcmClickActionUrl.attendance };
    });

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: teachersegment,
    });
  }
  public async mappedResponse(result: any) {
    const userResponse = result.map((item: any) => {
      const userMapping = {
        userId: item?.osid ? `${item.osid}` : "",
        refId1: item?.refId1 ? `${item.refId1}` : "",
        refId2: item?.refId2 ? `${item.refId2}` : "",
        refId3: item?.refId3 ? `${item.refId3}` : "",
        firstName: item?.firstName ? `${item.firstName}` : "",
        middleName: item?.middleName ? `${item.middleName}` : "",
        lastName: item?.lastName ? `${item.lastName}` : "",
        phoneNumber: item?.phoneNumber ? `${item.phoneNumber}` : "",
        email: item?.email ? `${item.email}` : "",
        aadhaar: item?.aadhaar ? `${item.aadhaar}` : "",
        gender: item?.gender ? `${item.gender}` : "",
        socialCategory: item?.socialCategory ? `${item.socialCategory}` : "",
        birthDate: item?.birthDate ? `${item.birthDate}` : "",
        designation: item?.designation ? `${item.designation}` : "",
        cadre: item?.cadre ? `${item.cadre}` : "",
        profQualification: item?.profQualification
          ? `${item.profQualification}`
          : "",
        joiningDate: item?.joiningDate ? `${item.joiningDate}` : "",
        subjectIds: item.subjectIds ? item.subjectIds : [],
        bloodGroup: item?.bloodGroup ? `${item.bloodGroup}` : "",
        maritalStatus: item?.maritalStatus ? `${item.maritalStatus}` : "",
        compSkills: item?.compSkills ? `${item.compSkills}` : "",
        disability: item?.disability ? `${item.disability}` : "",
        religion: item?.religion ? `${item.religion}` : "",
        homeDistance: item?.homeDistance ? `${item.homeDistance}` : "",
        employmentType: item?.employmentType ? `${item.employmentType}` : "",
        schoolId: item?.schoolId ? `${item.schoolId}` : "",
        address: item?.address ? `${item.address}` : "",
        village: item?.village ? `${item.village}` : "",
        block: item?.block ? `${item.block}` : "",
        district: item?.district ? `${item.district}` : "",
        stateId: item?.stateId ? `${item.stateId}` : "",
        pincode: item?.pincode ? item.pincode : "",
        locationId: item?.locationId ? `${item.locationId}` : "",
        image: item?.image ? `${item.image}` : "",
        status: item?.status ? `${item.status}` : "",
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        reportsTo: item?.reportsTo ? `${item.reportsTo}` : "",
        retirementDate: item?.retirementDate ? `${item.retirementDate}` : "",
        workingStatus: item?.workingStatus ? `${item.workingStatus}` : "",
        fcmToken: item?.fcmToken ? `${item.fcmToken}` : "",
        role: item?.role ? `${item.role}` : "",
        employeeCode: item?.employeeCode ? `${item.employeeCode}` : "",
        metaData: item?.metaData ? item.metaData : [],
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new UserDto(userMapping);
    });

    return userResponse;
  }
}
