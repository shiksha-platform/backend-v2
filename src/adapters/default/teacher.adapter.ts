import { Injectable, HttpException } from "@nestjs/common";
import { TeacherInterface } from "../../teacher/interfaces/teacher.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { TeacherDto } from "../../teacher/dto/teacher.dto";
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
}
