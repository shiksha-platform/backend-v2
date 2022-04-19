import { Injectable } from "@nestjs/common";
require("dotenv").config();

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.BASEAPIURL;
  }
}
