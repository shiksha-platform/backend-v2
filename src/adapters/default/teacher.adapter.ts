import { Injectable, HttpException } from "@nestjs/common";
import { TeacherInterface } from "../../teacher/interfaces/teacher.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { TeacherDto } from "../../teacher/dto/teacher.dto";
import { SaveTeacherDto } from "src/teacher/dto/save-teacher.dto";
import axios from "axios";
const resolvePath = require("object-resolve-path");
import { TeacherDetailDto } from "src/teacher/dto/teacher-detail.dto";
import { TeacherSearchDto } from "src/teacher/dto/teacher-search.dto";
import { TeacherResponseDto } from "src/teacher/dto/teacher-response.dto";

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
          osCreatedAt: data.osCreatedAt,
          osUpdatedAt: data.osUpdatedAt,
          osCreatedBy: data.osCreatedBy,
          osUpdatedBy: data.osUpdatedBy,
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
    return this.httpService.post(`${this.url}`, teacherDto, request).pipe(
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

  public async updateTeacher(id: string, teacherDto: TeacherDto) {
    const headersRequest = {
      "Content-Type": "application/json",
    };

    return this.httpService
      .patch(`${this.url}/${id}`, teacherDto, { headers: headersRequest })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "Teacher updated Successfully",
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
  public async searchTeacher(request: any, teacherSearchDto: TeacherSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, teacherSearchDto, request)
      .pipe(
        map((response) => {
          const data = response.data;

          return new SuccessResponse({
            statusCode: response.status,
            message: "Teacher found Successfully",
            data: data,
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
