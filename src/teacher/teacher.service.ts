import { Injectable } from "@nestjs/common";
import { TeacherInterface } from "./interfaces/teacher.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";
import { SuccessResponse } from "src/success-response";
import { TeacherDto } from "./dto/teacher.dto";
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
          socialCategory: "",
          birthDate: "",
          designation: "",
          cadre: "",
          profQualification: "",
          joiningDate: "",
          subjectId: "",
          bloodGroup: "",
          maritalStatus: "",
          blockI: "",
          address: "",
          compSkills: "",
          disability: "",
          religion: "",
          homeDistance: "",
          roles: "",
          schoolId: "",
          acrId: "",
          retirementDate: "",
          workingStatus: "",
          osCreatedAt: data.osCreatedAt,
          osUpdatedAt: data.osUpdatedAt,
          osCreatedBy: data.osCreatedBy,
          osUpdatedBy: data.osUpdatedBy,
        };

        const teacherDto = new TeacherDto(teacher);
        return new SuccessResponse({
          statusCode: 200,
          message: "Student found Successfully",
          data: teacherDto,
        });
      })
    );
  }

  public async createTeacher(request: any, teacherDto: TeacherDto) {
    return this.httpService.post(`${this.url}`, teacherDto, request).pipe(
      map((axiosResponse: AxiosResponse) => {
        return new SuccessResponse({
          statusCode: 200,
          message: "Student created Successfully",
          data: axiosResponse.data,
        });
      })
    );
  }
}
