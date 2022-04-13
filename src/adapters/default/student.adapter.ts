import { Injectable, HttpException } from "@nestjs/common";
import { StudentDto } from "../../student/dto/student.dto";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
const resolvePath = require("object-resolve-path");
import { StudentDetailDto } from "src/student/dto/student-detail.dto";
@Injectable()
export class StudentService {
  private student: StudentDto;

  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Student`;

  public async getStudent(studentId: any, request: any) {
    return this.httpService
      .get(`${this.url}/${studentId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;
          const student = {
            studentId: studentId,
            refId1: data.refId1,
            refId2: data.refId2,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            aadhaar: data.aadhaar,
            schoolId: data.schoolId,
            groupId: data.groupId,
            gender: data.gender,
            socialCategory: data.socialCategory,
            iscwsn: data.iscwsn,
            religion: data.religion,
            singleGirl: data.singleGirl,
            bpl: data.bpl,
            birthDate: data.birthDate,
            weight: data.weight,
            height: data.height,
            bloodGroup: data.bloodGroup,
            homeless: data.homeless,
            migrant: data.migrant,
            status: data.status,
            fatherName: data.fatherName,
            motherName: data.motherName,
            guardianName: data.guardianName,
            fatherPhoneNumber: data.fatherPhoneNumber,
            motherPhoneNumber: data.motherPhoneNumber,
            guardianPhoneNumber: data.guardianPhoneNumber,
            image: data.image,
            createdAt: data.osCreatedAt,
            updatedAt: data.osUpdatedAt,
            createdBy: data.osCreatedBy,
            updatedBy: data.osUpdatedBy,
          };

          const studentDto = new StudentDto(student);

          return new SuccessResponse({
            statusCode: 200,
            message: "student found Successfully",
            data: studentDto,
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

  public async createStudent(request: any, studentDto: StudentDto) {
    return this.httpService
      .post(`${this.url}`, studentDto, {
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

  public async updateStudent(id: string, request: any, studentDto: StudentDto) {
    var axios = require("axios");
    var data = studentDto;

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

  public async searchStudent(request: any, studentSearchDto: StudentSearchDto) {
    const template = {
      studentId: "osid",
      refId1: "refId1",
      refId2: "refId2",
      aadhaar: "aadhaar",
      firstName: "firstName",
      lastName: "lastName",
      schoolId: "schoolId",
      groupId: "groupId",
      iscwsn: "iscwsn",
      gender: "gender",
      socialCategory: "socialCategory",
      religion: "religion",
      singleGirl: "singleGirl",
      weight: "weight",
      height: "height",
      bloodGroup: "bloodGroup",
      birthDate: "birthDate",
      homeless: "homeless",
      bpl: "bpl",
      migrant: "migrant",
      status: "status",
      email: "email",
      fatherName: "fatherName",
      motherName: "motherName",
      guardianName: "guardianName",
      fatherPhoneNumber: "fatherPhoneNumber",
      motherPhoneNumber: "motherPhoneNumber",
      guardianPhoneNumber: "guardianPhoneNumber",
      image: "image",
      createdAt: "osCreatedAt",
      updatedAt: "osUpdatedAt",
      createdBy: "osCreatedBy",
      updatedBy: "osUpdatedBy",
    };
    return this.httpService
      .post(`${this.url}/search`, studentSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map((item: any) => {
            const studentDetailDto = new StudentDto(template);
            Object.keys(template).forEach((key) => {
              studentDetailDto[key] = resolvePath(item, template[key]);
            });
            return studentDetailDto;
          });

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
