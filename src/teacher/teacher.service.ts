import { Injectable } from "@nestjs/common";
import { TeacherInterface } from "./interfaces/teacher.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";

@Injectable()
export class TeacherService {
  private teacher: TeacherInterface;

  constructor(private httpService: HttpService) {}

  getOne(id: any): Observable<TeacherInterface> {
    return this.httpService
      .get(
        process.env.BASEAPIURL+"Teacher/"+id
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          this.teacher = {
            teacherId: id,
            firstName: axiosResponse.data.firstName,
            lastName: axiosResponse.data.lastName,
            email: axiosResponse.data.email,
            contactNumber: axiosResponse.data.contactNumber
          };
          
          return this.teacher;
        })
      );
  }
}
