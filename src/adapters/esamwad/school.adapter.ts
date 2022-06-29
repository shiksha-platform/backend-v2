import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { EsamwadSchoolDto } from "src/school/dto/esamwad-school.dto";
import { IServicelocator } from "../schoolservicelocator";
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
    const responseData = response.data.data;
    const responsedata = new EsamwadSchoolDto(responseData);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
  }
}
