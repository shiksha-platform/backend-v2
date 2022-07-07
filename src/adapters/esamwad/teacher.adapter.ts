import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { TeacherSearchDto } from "src/teacher/dto/teacher-search.dto";
import { TeacherDto } from "../../teacher/dto/teacher.dto";
import jwt_decode from "jwt-decode";
import { IServicelocator } from "../teacherservicelocator";
import { EsamwadTeacherDto } from "src/teacher/dto/esamwad.teacher.dto";
export const EsamwadTeacherToken = "EsamwadTeacher";
@Injectable()
export class EsamwadTeacherService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Teacher`;

  public async getTeacherByAuth(request: any) {
    const response = [
      {
        teacherId: "85",
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
        teacherAddress: "string",
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
    let result = response.map((item: any) => new EsamwadTeacherDto(item));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
}
