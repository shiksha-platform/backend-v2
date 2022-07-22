import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";

@Injectable()
export class InAppNotificationService {
  constructor(private httpService: HttpService) {}
  url = process.env.HISTORYAPIURL;

  public async userHistoryNotification(
    userId: string,
    provider: string,
    startDate: string,
    endDate: string,
    request: any
  ) {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `${this.url}history?userId=${userId}&provider=${provider}&endDate=${endDate}&startDate=${startDate}`,
      headers: {},
    };

    const response = await axios(config);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: response.data.result,
    });
  }

  public async botHistoryNotification(
    botId: string,
    provider: string,
    startDate: string,
    endDate: string,
    request: any
  ) {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `${this.url}history/dump?provider=${provider}&botId=${botId}&endDate=${endDate}&startDate=${startDate}`,
      headers: {},
    };

    const response = await axios(config);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: response.data.result,
    });
  }
}
