import { Injectable } from "@nestjs/common";
import { StudentDto } from "../../student/dto/student.dto";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";

@Injectable()
export class StudentService {
  private student: StudentDto;

  constructor(private httpService: HttpService) {}

  getOne(id: any): Observable<StudentDto> {
    return this.httpService
      .get(
        process.env.BASEAPIURL+"Student/"+id
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          this.student = {
            studentId: id,
            firstName: axiosResponse.data.studentFirstName,
            lastName: axiosResponse.data.studentLastName,
            email: axiosResponse.data.email,
            currentClassId: axiosResponse.data.currentClassID
          };
          return this.student;
        })
      );
  }
}
