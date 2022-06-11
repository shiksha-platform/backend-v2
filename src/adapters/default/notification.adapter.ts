import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import axios, { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { NotificationLogDto } from "src/notification/dto/notification.dto";
import { NotificationSearchDto } from "src/notification/dto/notification-search.dto";
import moment from "moment";
import { GroupDto } from "src/group/dto/group.dto";
import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";
@Injectable()
export class NotificationService {
  constructor(
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry
  ) {}
  baseURL = `${process.env.BASEAPIURL}`;
  UCIURL = `${process.env.UCIAPI}`;
  url = process.env.TEMPLATERURL;
  groupURL = `${process.env.BASEAPIURL}/Class`;
  public async sendNotification(
    module: string,
    eventTrigger: string,
    templateId: string,
    groupId: string,
    channel: string,
    hours: string,
    minutes: String,
    jobName: string,
    request: any
  ) {
    var axios = require("axios");
    if (hours) {
      const job = new CronJob(`0 ${minutes} ${hours} * * *`, async () => {
        console.log(`hours (${hours}:${minutes}) for task ${jobName} to run!`);
        var axios = require("axios");
        const result = Math.random().toString(27).substring(6, 8);
        var confi = {
          method: "get",
          url: `${this.url}${templateId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };

        const getContent = await axios(confi);
        const contentData = getContent.data;

        // Conversation Logic
        var conversationData = {
          data: {
            name: `Shiksha ${channel} Broadcast ${result}`,
            transformers: [
              {
                id: "774cd134-6657-4688-85f6-6338e2323dde",
                meta: {
                  body: contentData.body,
                  type: contentData.type,
                  user: "25bbdbf7-5286-4b85-a03c-c53d1d990a23",
                },
                type: "broadcast",
              },
            ],
            adapter: contentData.user,
          },
        };

        var config = {
          method: "post",
          url: `${this.UCIURL}/conversationLogic/create`,
          headers: {
            "admin-token": "EXnYOvDx4KFqcQkdXqI38MHgFvnJcxMS",
            "Content-Type": "application/json",
          },
          data: conversationData,
        };

        const response = await axios(config);
        const resData = response.data;
        const consversationLogicID = resData.result.data.id;

        var axios = require("axios");
        var data = {
          filters: {
            osid: {
              eq: groupId,
            },
          },
        };

        var getSegment = {
          method: "post",
          url: `${this.groupURL}/search`,
          headers: {
            Authorization: request.headers.authorization,
          },
          data: data,
        };

        const responseData = await axios(getSegment);

        const dtoResponse = responseData.data.map(
          (item: any) => new GroupDto(item)
        );

        const filterObj = dtoResponse.filter((e: any) => e);
        let option = filterObj[0].option;
        let optionStr = JSON.stringify(option);
        var jsonObj = JSON.parse(optionStr);
        let segment = JSON.parse(jsonObj);

        if (
          module === segment.module &&
          eventTrigger === segment.eventTrigger
        ) {
          // Bot Logic

          var botData = {
            data: {
              startingMessage: `Hi Shiksha ${channel} Broadcast ${result}`,
              name: `Shiksha Notification Broadcast ${result}`,
              users: [segment.todaySegment],
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
              "admin-token": "EXnYOvDx4KFqcQkdXqI38MHgFvnJcxMS",
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
              recepients: [segment.todaySegment],
              sentDate: new Date(),
              module: segment.module,
              options: [contentData.body],
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
          console.log(logResponse);

          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: {
              status: "SMS Notification Sent Successfully",
              log: "Notifications Log saved successfully",

              logResponse,
            },
          });
        } else {
          return "module not found";
        }
      });

      this.schedulerRegistry.addCronJob(jobName, job);
      job.start();

      return `SMS set for EOD at ${hours}:${minutes}`;
    } else {
      const result = Math.random().toString(27).substring(6, 8);
      var confi = {
        method: "get",
        url: `${this.url}${templateId}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const getContent = await axios(confi);
      const contentData = getContent.data;

      // Conversation Logic
      var conversationData = {
        data: {
          name: `Shiksha ${channel} Broadcast ${result}`,
          transformers: [
            {
              id: "774cd134-6657-4688-85f6-6338e2323dde",
              meta: {
                body: contentData.body,
                type: contentData.type,
                user: "25bbdbf7-5286-4b85-a03c-c53d1d990a23",
              },
              type: "broadcast",
            },
          ],
          adapter: contentData.user,
        },
      };

      var config = {
        method: "post",
        url: `${this.UCIURL}/conversationLogic/create`,
        headers: {
          "admin-token": "EXnYOvDx4KFqcQkdXqI38MHgFvnJcxMS",
          "Content-Type": "application/json",
        },
        data: conversationData,
      };

      const response = await axios(config);
      const resData = response.data;
      const consversationLogicID = resData.result.data.id;

      var axios = require("axios");

      var data = {
        filters: {
          osid: {
            eq: groupId,
          },
        },
      };

      var getSegment = {
        method: "post",
        url: `${this.groupURL}/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const responseData = await axios(getSegment);

      const dtoResponse = responseData.data.map(
        (item: any) => new GroupDto(item)
      );

      const filterObj = dtoResponse.filter((e: any) => e);
      let option = filterObj[0].option;
      let optionStr = JSON.stringify(option);
      var jsonObj = JSON.parse(optionStr);
      let segment = JSON.parse(jsonObj);

      if (module === segment.module && eventTrigger === segment.eventTrigger) {
        var botData = {
          data: {
            startingMessage: `Hi Shiksha ${channel} Broadcast ${result}`,
            name: `Shiksha Notification Broadcast ${result}`,
            users: [segment.todaySegment],
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
            "admin-token": "EXnYOvDx4KFqcQkdXqI38MHgFvnJcxMS",
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
            recepients: [segment.todaySegment],
            sentDate: new Date(),
            module: segment.module,
            options: [contentData.body],
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
      } else {
        return "module not found";
      }
    }
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
