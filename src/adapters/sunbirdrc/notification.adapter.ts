import { Injectable, HttpException, Param } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import axios, { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError, takeLast } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { NotificationLogDto } from "src/notification/dto/notification.dto";
import { NotificationSearchDto } from "src/notification/dto/notification-search.dto";
import moment from "moment";
import { GroupDto } from "src/group/dto/group.dto";
import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";
import jwt_decode from "jwt-decode";

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

  public async instantSendNotification(
    module: any,
    eventTrigger: string,
    templateId: string,
    senderId: string,
    groupId: string,
    channel: string,
    request: any
  ) {
    try {
      var axios = require("axios");
      const result = Math.random().toString(27).substring(1, 8);
      var confi = {
        method: "get",
        url: `${this.url}${templateId}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const getContent = await axios(confi);
      const contentData = getContent.data;

      var data = {
        filters: {
          osid: {
            eq: groupId,
          },
        },
      };

      const responseData = await axios.post(`${this.groupURL}/search`, data, {
        headers: {
          Authorization: request.headers.authorization,
        },
      });

      const dtoResponse = await this.groupResponse(responseData.data);
      const filterObj = dtoResponse.filter((e: any) => e);
      let option = filterObj[0].option;
      let optionStr = JSON.stringify(option);
      var jsonObj = JSON.parse(optionStr);
      let params = JSON.parse(jsonObj);
      var notificationModule = params.filter(
        (obj: any) => obj.module === module
      );
      const triggers = notificationModule[0].eventTriggers;
      var notificationTrigger = triggers.filter(
        (obj: any) => obj.name === eventTrigger
      );
      let botIdChecked = notificationTrigger[0].botId;

      let botCreateID: any;

      if (botIdChecked.length > 0) {
        botCreateID = notificationTrigger[0].botId;
      } else {
        // Conversation Logic
        var conversationData = {
          data: {
            name: `Shiksha ${channel} Broadcast ${result}`,
            transformers: [
              {
                id: process.env.TRANSFORMERSID,
                meta: {
                  body: contentData.body,
                  type: contentData.type,
                  user: process.env.TRANSFORMERSUSER,
                },
                type: "broadcast",
              },
            ],
            adapter: contentData.user,
          },
        };

        const conversation = await axios.post(
          `${this.UCIURL}/conversationLogic/create`,
          conversationData,
          {
            headers: {
              "admin-token": process.env.UCIADMINTOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        const resData = conversation.data;
        const consversationLogicID = resData.result.data.id;

        var botData = {
          data: {
            startingMessage: `Hi Shiksha ${channel} Broadcast ${result}`,
            name: `Shiksha Notification Broadcast ${result}`,
            users: [notificationTrigger[0].userSegment],
            logic: [consversationLogicID],
            status: "enabled",
            startDate: moment().format("Y-MM-DD"),
            endDate: moment().format("Y-MM-DD"),
          },
        };

        const botResponse = await axios.post(
          `${this.UCIURL}/bot/create`,
          botData,
          {
            headers: {
              "admin-token": process.env.UCIADMINTOKEN,
              "Content-Type": "application/json",
            },
          }
        );

        const botResData = botResponse.data;
        botCreateID = botResData.result.data.id;
      }

      var configs = {
        method: "get",
        url: `${process.env.BOTCALL}${botCreateID}`,
        headers: {},
      };

      const botres = await axios(configs);

      const sendData = botres.data;
      // Notification Log

      var notificationData = {
        medium: channel,
        templateId: templateId,
        recepients: [notificationTrigger[0].userSegment],
        sentDate: new Date(),
        sentBy: senderId,
        module: notificationModule[0].module,
        options: "",
        content: contentData.body,
      };

      const logRes = await axios.post(
        `${this.baseURL}Notificationlog`,
        notificationData,
        {
          headers: {
            Authorization: request.headers.authorization,
          },
        }
      );
      const logResponse = logRes.data;
      return new SuccessResponse({
        statusCode: 200,
        message: "ok.",
        data: logResponse,
      });
    } catch (e) {
      return e.response.data;
    }
  }

  //Notificationschedule
  public async scheduleSendNotification(
    module: any,
    eventTrigger: string,
    templateId: string,
    senderId: string,
    groupId: string,
    channel: string,
    month: string,
    date: string,
    hours: string,
    minutes: String,
    jobName: string,
    request: any
  ) {
    try {
      var axios = require("axios");

      //content data api
      var confi = {
        method: "get",
        url: `${this.url}${templateId}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };
      const getContent = await axios(confi);
      const contentData = getContent.data;

      //params data
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

      const dtoResponse = await this.groupResponse(responseData.data);

      const filterObj = dtoResponse.filter((e: any) => e);

      let option = filterObj[0].option;

      let optionStr = JSON.stringify(option);
      var jsonObj = JSON.parse(optionStr);
      let params = JSON.parse(jsonObj);
      var notificationModule = params.filter(
        (obj: any) => obj.module === module
      );
      const triggers = notificationModule[0].eventTriggers;
      var notificationTrigger = triggers.filter(
        (obj: any) => obj.name === eventTrigger
      );
      let botIdChecked = notificationTrigger[0].botId;
      let botCreateID: any;

      //save notification
      let notificationScheduleData = {
        medium: channel,
        templateId: templateId,
        recepients: [notificationTrigger[0].userSegment],
        sentDate: date,
        sentBy: senderId,
        module: notificationModule[0].module,
        options: "",
        content: contentData.body,
        scheduleDate: date,
        hours,
        minutes,
        month,
      };

      var logConfig = {
        method: "post",
        url: `${this.baseURL}Notificationschedule`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: notificationScheduleData,
      };

      const logRes = await axios(logConfig);
      const logResponse = logRes.data;

      //cronJob logic

      let osid = logResponse.result.Notificationschedule.osid;

      var yy = date.slice(0, 4);
      let year = parseInt(yy);

      var dd = date.slice(-2);
      let d = parseInt(dd);

      var mm = date.slice(5, 7);
      let mon = parseInt(mm);
      mon = mon - 1;

      let hrs = parseInt(hours);
      let mins = +minutes;

      let ist = new Date(year, mon, d, hrs, mins);
      let utc = moment.utc(ist).format("YYYY-MM-DD HH:mm:ss ");
      let utcMin = utc.slice(14, 16);
      let utcHrs = utc.slice(11, 13);
      let utcDay = utc.slice(8, 11);
      let utcMon = utc.slice(5, 7);
      const job = new CronJob(
        // `0 ${utcMin} ${utcHrs} ${utcDay} ${utcMon} *`,
        `0 ${mins} ${hrs} ${d} ${mon} *`,
        async () => {
          try {
            var axios = require("axios");
            const result = Math.random().toString(27).substring(1, 8);

            if (botIdChecked.length > 0) {
              botCreateID = notificationTrigger[0].botId;
            } else {
              // Conversation Logic
              var conversationData = {
                data: {
                  name: `Shiksha ${channel} Broadcast ${result}`,
                  transformers: [
                    {
                      id: process.env.TRANSFORMERSID,
                      meta: {
                        body: contentData.body,
                        type: contentData.type,
                        user: process.env.TRANSFORMERSUSER,
                      },
                      type: "broadcast",
                    },
                  ],
                  adapter: contentData.user,
                },
              };

              const conversation = await axios.post(
                `${this.UCIURL}/conversationLogic/create`,
                conversationData,
                {
                  headers: {
                    "admin-token": process.env.UCIADMINTOKEN,
                    "Content-Type": "application/json",
                  },
                }
              );

              const resData = conversation.data;
              const consversationLogicID = resData.result.data.id;

              var botData = {
                data: {
                  startingMessage: `Hi Shiksha ${channel} Broadcast ${result}`,
                  name: `Shiksha Notification Broadcast ${result}`,
                  users: [notificationTrigger[0].userSegment],
                  logic: [consversationLogicID],
                  status: "enabled",
                  startDate: moment().format("Y-MM-DD"),
                  endDate: moment().format("Y-MM-DD"),
                },
              };

              const botResponse = await axios.post(
                `${this.UCIURL}/bot/create`,
                botData,
                {
                  headers: {
                    "admin-token": process.env.UCIADMINTOKEN,
                    "Content-Type": "application/json",
                  },
                }
              );

              const botResData = botResponse.data;
              botCreateID = botResData.result.data.id;
            }

            var configs = {
              method: "get",
              url: `${process.env.BOTCALL}${botCreateID}`,
              headers: {},
            };
            const botres = await axios(configs);

            const sendData = botres.data;
            // Notification Log

            var notificationData = {
              medium: channel,
              templateId: templateId,
              recepients: [notificationTrigger[0].userSegment],
              sentDate: date,
              sentBy: senderId,
              module: module,
              options: "",
              content: contentData.body,
              scheduleDate: date,
              hours,
              minutes,
              month,
            };
            const logRes = await axios.post(
              `${this.baseURL}Notificationlog`,
              notificationData,
              {
                headers: {
                  Authorization: request.headers.authorization,
                },
              }
            );
            const logResponse = logRes.data;

            var deleteCron = {
              method: "delete",
              url: `${this.baseURL}Notificationschedule/${osid}`,
              headers: {
                Authorization: request.headers.authorization,
              },
            };
            const deletedNotification = await axios(deleteCron);

            job.stop();
          } catch (e) {
            return e.response.data;
          }
        }
      );

      this.schedulerRegistry.addCronJob(jobName, job);
      job.start();

      return `SMS set for EOD at ${hours}:${minutes} `;
    } catch (e) {
      return `${e}`;
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
        map(async (axiosResponse: AxiosResponse) => {
          let notificationData = [axiosResponse.data];
          const NotificationLogDto = await this.notificationLog(
            notificationData
          );

          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: NotificationLogDto[0],
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
        map(async (response) => {
          const responsedata = await this.notificationLog(response.data);
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

  //schedule
  public async searchSchedulehNotification(
    request: any,
    notificationSearchDto: NotificationSearchDto
  ) {
    return this.httpService
      .post(
        `${this.baseURL}/Notificationschedule/search`,
        notificationSearchDto,
        {
          headers: {
            Authorization: request.headers.authorization,
          },
        }
      )
      .pipe(
        map(async (response) => {
          const responsedata = await this.notificationLog(response.data);
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

  public async getScheduleNotification(
    ScheduleNotificationid: string,
    request: any
  ) {
    return this.httpService
      .get(`${this.baseURL}/Notificationschedule/${ScheduleNotificationid}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          let scheduleNotificationData = [axiosResponse.data];
          const responsedata = await this.notificationLog(
            scheduleNotificationData
          );

          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: responsedata[0],
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
  public async notificationLog(result: any) {
    const notificationLog = result.map((item: any) => {
      const notificationLogMapping = {
        notificationLogId: item?.osid ? `${item.osid}` : "",
        content: item?.content ? `${item.content}` : "",
        recepients: item?.recepients ? item.recepients : [],
        module: item?.module ? `${item.module}` : "",
        templateContentId: item?.templateContentId
          ? `${item.templateContentId}`
          : "",
        templateId: item?.templateId ? `${item.templateId}` : "",
        medium: item?.medium ? `${item.medium}` : "",
        sentDate: item?.sentDate ? `${item.sentDate}` : "",
        sentBy: item?.sentBy ? `${item.sentBy}` : "",
        scheduleDate: item?.scheduleDate ? `${item.scheduleDate}` : "",
        options: item?.options ? item.options : "",
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new NotificationLogDto(notificationLogMapping);
    });

    return notificationLog;
  }
  public async groupResponse(result: any) {
    const groupResponse = result.map((item: any) => {
      const groupMapping = {
        groupId: item?.osid ? `${item.osid}` : "",
        schoolId: item?.schoolId ? `${item.schoolId}` : "",
        name: item?.name ? `${item.name}` : "",
        type: item?.type ? `${item.type}` : "",
        section: item?.section ? `${item.section}` : "",
        status: item?.status ? `${item.status}` : "",
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        mediumOfInstruction: item?.mediumOfInstruction
          ? `${item.mediumOfInstruction}`
          : "",
        teacherId: item?.teacherId ? `${item.teacherId}` : "",
        parentId: item?.parentId ? `${item.parentId}` : "",
        image: item?.image ? `${item.image}` : "",
        metaData: item?.metaData ? item.metaData : [],
        option: item?.option ? item.option : [],
        gradeLevel: item?.gradeLevel ? `${item.gradeLevel}` : "",
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new GroupDto(groupMapping);
    });

    return groupResponse;
  }
}
