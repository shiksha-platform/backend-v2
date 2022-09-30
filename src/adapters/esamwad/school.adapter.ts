import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { EsamwadSchoolDto } from "src/school/dto/esamwad-school.dto";
import { IServicelocator } from "../schoolservicelocator";
import { SchoolDto } from "src/school/dto/school.dto";
export const EsamwadSchoolToken = "EsamwadSchool";
@Injectable()
export class EsamwadSchoolService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.ESAMWADAPI}/v1/school`;

  public async searchSchool() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: this.url,
      headers: {
        Authorization: process.env.ESAMWADTOKEN,
      },
    };

    const response = await axios(config);
    const responseData = [response.data.data];
    const schoolDto = await this.mappedResponse(responseData);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: schoolDto,
    });
  }
  createSchool(request: any, schoolDto: SchoolDto) {}
  updateSchool(id: string, request: any, schoolDto: SchoolDto) {}
  getSchool(schoolId: any, request: any) {}
  public async mappedResponse(result: any) {
    const schoolResponse = result.map((item: any) => {
      const schoolMapping = {
        schoolId: item?.id ? `${item.id}` : "",
        schoolName: item?.schoolName ? item.schoolName : "",
        udise: item?.udise ? `${item.udise}` : "",
        schoolType: item?.type ? `${item.type}` : "",
        classes: item?.classes,
        meta: item?.session,
        location: item?.location,
      };
      return new SchoolDto(schoolMapping);
    });

    return schoolResponse;
  }
}
