import { Injectable, HttpException } from "@nestjs/common";

import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
const resolvePath = require("object-resolve-path");
import { TeacherDetailDto } from "src/teacher/dto/teacher-detail.dto";
import { TeacherSearchDto } from "src/teacher/dto/teacher-search.dto";
import { TeacherDto } from "../../teacher/dto/teacher.dto";
import { TeacherInterface } from "../../teacher/interfaces/teacher.interface";

@Injectable()
export class TeacherService {
  private teacher: TeacherInterface;

  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Teacher`;

  getTeacher(id: any, request: any) {
    return this.httpService.get(`${this.url}/${id}`, request).pipe(
      map((axiosResponse: AxiosResponse) => {
        let data = axiosResponse.data;
        const teacher = {
          teacherId: id,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNumber: data.contactNumber,
          email: data.email,
          gender: data.gendar,
          socialCategory: data.socialCategory,
          birthDate: data.birthDate,
          designation: data.designation,
          cadre: data.cadre,
          profQualification: data.profQualification,
          joiningDate: data.joiningDate,
          subjectId: data.subjectId,
          bloodGroup: data.bloodGroup,
          maritalStatus: data.maritalStatus,
          blockI: data.blockI,
          address: data.address,
          compSkills: data.compSkills,
          disability: data.disability,
          religion: data.religion,
          homeDistance: data.homeDistance,
          roles: data.roles,
          schoolId: data.schoolId,
          acrId: data.acrId,
          retirementDate: data.retirementDate,
          workingStatus: data.workingStatus,
          createdAt: data.osCreatedAt,
          updatedAt: data.osUpdatedAt,
          createdBy: data.osCreatedBy,
          updatedBy: data.osUpdatedBy,
        };

        const teacherDto = new TeacherDto(teacher);
        return new SuccessResponse({
          statusCode: 200,
          message: "Teacher found Successfully",
          data: teacherDto,
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

  public async createTeacher(request: any, teacherDto: TeacherDto) {
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
            message: "Teacher created Successfully",
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

  public async updateTeacher(id: string, request: any, teacherDto: TeacherDto) {
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
      message: "Teacher updated Successfully",
      data: response.data,
    });
  }
  public async searchTeacher(request: any, teacherSearchDto: TeacherSearchDto) {
    var template = {
      teacherId: "osid",
      firstName: "firstName",
      lastName: "lastName",
      gender: "gender",
      dob: "dob",
      email: "email",
      contactNumber: "mobile",
      address: "address",
      socialCategory: "socialCategory",
      birthDate: "birthDate",
      designation: "designation",
      cadre: "cadre",
      profQualification: "profQualification",
      joiningDate: "joiningDate",
      subjectId: "subjectId",
      bloodGroup: "bloodGroup",
      maritalStatus: "maritalStatus",
      blockI: "blockI",
      compSkills: "compSkills",
      disability: "disability",
      religion: "religion",
      homeDistance: "homeDistance",
      roles: "roles",
      schoolId: "schoolId",
      acrId: "acrId",
      retirementDate: "retirementDate",
      workingStatus: "workingStatus",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      createdBy: "createdBy",
      updatedBy: "updatedBy",
    };
    return this.httpService
      .post(`${this.url}/search`, teacherSearchDto, request)
      .pipe(
        map((response) => {
          const responsedata = response.data.map((item) => {
            const teacherDetailDto = new TeacherDetailDto(template);
            Object.keys(template).forEach((key) => {
              teacherDetailDto[key] = resolvePath(item, template[key]);
            });
            return teacherDetailDto;
          });

          return new SuccessResponse({
            statusCode: response.status,
            message: "Teacher found Successfully",
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
