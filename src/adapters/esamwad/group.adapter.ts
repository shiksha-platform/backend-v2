import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";

import { IServicelocatorgroup } from "../groupservicelocator";
import { EsamwadDto } from "src/group/dto/esamwad-group.dto";
export const EsamwadGroupToken = "EsamwadGroup";

@Injectable()
export class EsamwadGroupService implements IServicelocatorgroup {
  constructor(private httpService: HttpService) {}
  url = `${process.env.ESAMWADAPI}/v5/student`;
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;

  public async getGroup(groupId: any, request: any) {
    var axios = require("axios");
    var data = {
      query: `query getGroup($id: Int!) {
        grade(where: {id: {_eq: $id}}) {
          id
          section
          number
          stream_id
          school_grades{
            school_id
          }
        }
      }`,
      variables: { id: groupId },
    };
    var config = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);

    const responsedata = response.data.data.grade.map(
      (item: any) => new EsamwadDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "student found Successfully",
      data: responsedata,
    });
  }
}
