import { Injectable } from "@nestjs/common";
import { StudentInterface } from "./interfaces/student.interface";
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
        "https://dev-shiksha.uniteframework.io/registry/api/v1/Student/c008ac28-cbc1-4abb-a215-4917e360b1a1"
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          this.student = {
            studentId: id,
            firstName: axiosResponse.data.studentFirstName,
          };
          return this.student;
        })
      );
  }
}
