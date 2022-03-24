import { Injectable } from "@nestjs/common";
import { SchoolInterface } from "./interfaces/school.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";

@Injectable()
export class SchoolService {
  private school: SchoolInterface;

  constructor(private httpService: HttpService) {}

  getOne(id: any): Observable<SchoolInterface> {
    return this.httpService
      .get(
        process.env.BASEAPIURL+"School/"+id
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          this.school = {
            schoolId: id,
            schoolName: axiosResponse.data.schoolName,
            schoolType: axiosResponse.data.schoolType,
            email: axiosResponse.data.email,
            website: axiosResponse.data.website,
            instituteManagement: axiosResponse.data.instituteManagement,
            street: axiosResponse.data.address.street,
            city: axiosResponse.data.address.city,
            district: axiosResponse.data.address.district,
            state: axiosResponse.data.address.state,
            pincode: axiosResponse.data.address.pincode
          };
          return this.school;
        })
      );
  }
}
