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
            refId: "",
            firstName: axiosResponse.data.studentFirstName,
            lastName: axiosResponse.data.studentLastName,
            email: axiosResponse.data.email,
            currentClassId: axiosResponse.data.currentClassID,
            aadhaar: null,
            schoolId: "",
            gender: "",
            socialCategory: "",
            iscwsn: "",
            religion: "",
            singleGirl: null,
            bpl: null,
            birthDate: null,
            weight: null,
            height: null,
            bloodGroup: "",
            homeless: null,
            migrant: null,
            status: "",

            createdAt: axiosResponse.data.osCreatedAt,
            updatedAt: axiosResponse.data.osUpdatedAt,
            createdBy: axiosResponse.data.osCreatedBy,
            updatedBy: axiosResponse.data.osUpdatedBy,
  
          };
          return this.student;
        })
      );
  }
}
