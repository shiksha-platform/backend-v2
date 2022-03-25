import { Injectable } from "@nestjs/common";
import { StudentInterface } from "../../student/interfaces/student.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";

@Injectable()
export class StudentService {
  private student: StudentInterface;

  constructor(private httpService: HttpService) {}

  getOne(id: any): Observable<StudentInterface> {
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
