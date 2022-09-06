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

import { EsamwadUserDto } from "src/user/dto/esamwad.user.dto";
import { IServicelocator } from "../userservicelocator";
export const EsamwadUserToken = "EsamwadUser";
@Injectable()
export class EsamwadUserService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/User`;

  public async getUserByAuth(request: any) {
    const response = [
      {
        userId: "85",
        refId1: "string",
        refId2: "string",
        refId3: "string",
        firstName: "Ashwin",
        middleName: "string",
        lastName: "Date",
        phoneNumber: "",
        email: "jona@gmail.com",
        aadhaar: "string",
        gender: "Male",
        socialCategory: "string",
        birthDate: "string",
        designation: "string",
        cadre: "string",
        profQualification: "string",
        joiningDate: "string",
        subjectIds: ["string"],
        bloodGroup: "string",
        maritalStatus: "string",
        compSkills: "string",
        disability: "string",
        religion: "string",
        homeDistance: "string",
        schoolId: "15547",
        address: "string",
        village: "string",
        block: "string",
        district: "string",
        stateId: "string",
        pincode: "",
        locationId: "string",
        retirementDate: "string",
        workingStatus: "string",
        image: "string",
        employmentType: "string",
        status: "string",
        deactivationReason: "string",
        reportsTo: "string",
        metaData: ["string"],
      },
    ];
    let result = response.map((item: any) => new EsamwadUserDto(item));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
  getUser(id: any, request: any) {}
  createUser(request: any, teacherDto: UserDto) {}
  updateUser(id: string, request: any, teacherDto: UserDto) {}
  searchUser(request: any, teacherSearchDto: UserSearchDto) {}
  teacherSegment(schoolId: string, templateId: string, request: any) {}
}
