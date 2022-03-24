import { Injectable } from "@nestjs/common";
import { GroupInterface } from "./interfaces/group.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";

@Injectable()
export class GroupService {
  private group: GroupInterface;

  constructor(private httpService: HttpService) {}

  getOne(id: any): Observable<GroupInterface> {
    return this.httpService
      .get(
        process.env.BASEAPIURL+ "Class/"+id
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          this.group = {
            groupId: id,
            name: axiosResponse.data.className
 
           };
          return this.group;
        })
      );
  }
}
