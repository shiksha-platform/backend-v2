import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { NotificationLogDto } from "src/notification/dto/notification.dto";
import { NotificationSearchDto } from "src/notification/dto/notification-search.dto";
import moment from "moment";
import { TemplateContentDto } from "src/template/dto/template-content.dto";
@Injectable()
export class NotificationService {
  constructor(private httpService: HttpService) {}
  baseURL = `${process.env.BASEAPIURL}`;
  UCIURL = `${process.env.UCIAPI}`;
  public async sendNotification(
    templateId: string,
    userSegment: string,
    request: any
  ) {
    var axios = require("axios");
    const result = Math.random().toString(27).substring(6, 8);
    var data = {
      filters: {
        templateId: {
          eq: templateId,
        },
      },
    };
    var confi = {
      method: "post",
      url: `${this.baseURL}Templatecontent/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };

    const getContent = await axios(confi);
    const contentData = getContent.data;

    let result1 = contentData.map((item: any) => new TemplateContentDto(item));
    const filterObj = result1.filter((e: any) => e);

    // Conversation Logic
    var conversationData = {
      data: {
        name: `${filterObj[0].subject} ${result}`,
        transformers: [
          {
            id: "774cd134-6657-4688-85f6-6338e2323dde",
            meta: {
              body: filterObj[0].body,
              type: "JS_TEMPLATE_LITERALS",
              user: filterObj[0].user,
            },
            type: filterObj[0].type,
          },
        ],
        adapter: filterObj[0].adapter,
      },
    };

    var config = {
      method: "post",
      url: `${this.UCIURL}/conversationLogic/create`,
      headers: {
        "admin-token": filterObj[0].adminToken,
        "Content-Type": "application/json",
      },
      data: conversationData,
    };

    const response = await axios(config);
    const resData = response.data;
    const consversationLogicID = resData.result.data.id;

    // Bot Logic

    var botData = {
      data: {
        startingMessage: `Hi Shiksha SMS Broadcast ${result}`,
        name: `Shiksha Notification Broadcast ${result}`,
        users: [userSegment],
        logic: [consversationLogicID],
        status: "enabled",
        startDate: moment().format("Y-MM-DD"),
        endDate: moment().format("Y-MM-DD"),
      },
    };

    var botConfig = {
      method: "post",
      url: `${this.UCIURL}/bot/create`,
      headers: {
        "admin-token": filterObj[0].adminToken,
        "Content-Type": "application/json",
      },
      data: botData,
    };

    const botResponse = await axios(botConfig);
    const botResData = botResponse.data;
    const botCreateID = botResData.result.data.id;

    var configs = {
      method: "get",
      url: `${process.env.BOTCALL}${botCreateID}`,
      headers: {},
    };

    const botres = await axios(configs);

    const sendData = botres.data;
    console.log(sendData, "Notification Sent Successfully");
    // Notification Log

    var notificationData = {
      data: {
        medium: conversationData.data.adapter,
        templateId: templateId,
        recepients: [botData.data.users, filterObj[0].body],
        module: contentData.enabled,
        options: [],
      },
    };

    var logConfig = {
      method: "post",
      url: `${this.baseURL}Notificationlog`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: notificationData,
    };
    const logRes = await axios(logConfig);
    const logResponse = logRes.data;
    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: {
        status: "SMS Notification Sent Successfully",
        log: "Notifications Log saved successfully",

        logResponse,
      },
    });
  }

  public async getNotification(notificationId: string, request: any) {
    return this.httpService
      .get(`${this.baseURL}/Notificationlog/${notificationId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let notificationData = axiosResponse.data;
          const templateDto = new NotificationLogDto(notificationData);

          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: templateDto,
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

  public async searchNotification(
    request: any,
    notificationSearchDto: NotificationSearchDto
  ) {
    return this.httpService
      .post(`${this.baseURL}/Notificationlog/search`, notificationSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new NotificationLogDto(item)
          );

          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: responsedata,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response.status,
            errorMessage: e.response.data.params.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }
}
