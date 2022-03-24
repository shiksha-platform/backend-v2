import { Injectable, HttpException } from "@nestjs/common";
import { StudentInterface } from "./interfaces/student.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, catchError, Observable } from "rxjs";
import { response } from "express";
import { StudentDto } from "./dto/student.dto";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "../error-response";
import { SaveStudentDto } from "./dto/save-student.dto";

@Injectable()
export class StudentService {
  private student: StudentInterface;

  constructor(private httpService: HttpService) {}

  url = `${process.env.BASE_URL}/Student`;

  public async getStudent(id: any, request: any) {
    console.log(this.url);
    return this.httpService.get(`${this.url}/${id}`, request).pipe(
      map((axiosResponse: AxiosResponse) => {
        const data = axiosResponse.data;

        let student = {
          studentId: data.osid,
          firstName: data.studentFirstName,
          lastName: data.studentLastName,
          email: data.email,
          refId: data.studentRefId,
          aadhaar: data.aadhaar,
          schoolId: data.schoolId,
          currentClassId: data.currentClassID,
          gender: data.gender,
          socialCategory: data.socialCategory,
          iscwsn: "",
          religion: "",
          singleGirl: "",
          weight: "",
          height: "",
          bloodGroup: "",
          birthDate: "",
          homeless: "",
          bpl: "",
          migrant: "",
          status: "",
          studentName: data.studentFullName,
          contactNumber: "",
          image: "",
        };

        const studentDto = new StudentDto(student);
        return new SuccessResponse({
          statusCode: 200,
          message: "Student found Successfully",
          data: studentDto,
        });
      }),
      catchError((e: any) => {
        var error = new ErrorResponse({
          errorCode: e.response.status,
          errorMessage: e.response.data.params.errmsg,
        });
        throw new HttpException(error, e.response.status);
      })
    );
  }

  public async createStudent(request: any, studentDto: StudentDto) {
    return this.httpService.post(`${this.url}`, studentDto, request).pipe(
      map((axiosResponse: AxiosResponse) => {
        return new SuccessResponse({
          statusCode: 200,
          message: "Student created Successfully",
          data: axiosResponse.data,
        });
      }),

      catchError((e: any) => {
        var error = new ErrorResponse({
          errorCode: e.response.status,
          errorMessage: e.response.data.params.errmsg,
        });
        throw new HttpException(error, e.response.status);
      })
    );
  }

  public async updateStudent(request: any) {}
}
