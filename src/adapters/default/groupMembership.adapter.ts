import { Injectable } from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";
import { SuccessResponse } from "src/success-response";
const resolvePath = require("object-resolve-path");
@Injectable()
export class GroupMembershipService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/GroupMembership`;
}
