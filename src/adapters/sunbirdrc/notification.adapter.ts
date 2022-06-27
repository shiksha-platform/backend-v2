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
import { min } from "class-validator";
import { time } from "console";

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
    groupId: string,
    channel: string,
    request: any
  ) {
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let sentBy = decoded.sub;
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
          "admin-token": process.env.UCIADMINTOKEN,
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
      let params = JSON.parse(jsonObj);
      params.todaySegment = params.module[module].eventTrigger[eventTrigger];
      
      var botData = {
        data: {
          startingMessage: `Hi Shiksha ${channel} Broadcast ${result}`,
          name: `Shiksha Notification Broadcast ${result}`,
          users: [params.todaySegment],
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
          "admin-token": process.env.UCIADMINTOKEN,
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
      // Notification Log

      var notificationData = {
        
          medium: conversationData.data.adapter,
          templateId: templateId,
          recepients: [params.todaySegment],
          sentDate: new Date(),
          sentBy: sentBy,
          module: module,
          options: contentData.body,
        
      };
      let log = this.saveNotificationLog(notificationData, request);
      return log;
    
  }

  //Notificationschedule
  public async scheduleSendNotification(
    module: any,
    eventTrigger: string,
    templateId: string,
    groupId: string,
    channel: string,
    month:string,
    date:string,
    hours: string,
    minutes: String,
    jobName: string,
    request: any
  ) {
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let sentBy = decoded.sub;
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

    const dtoResponse = responseData.data.map(
      (item: any) => new GroupDto(item)
    );

    const filterObj = dtoResponse.filter((e: any) => e);

    let option = filterObj[0].option;

    let optionStr = JSON.stringify(option);
    var jsonObj = JSON.parse(optionStr);
    let params = JSON.parse(jsonObj);
    params.todaySegment = params.module[module].eventTrigger[eventTrigger];

    //save notification
    let notificationScheduleData = {
      medium: channel,
      templateId: templateId,
      recepients: [params.todaySegment],
      sentDate: new Date(),
      sentBy: sentBy,
      module: module,
      options: contentData.body,
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

    // var notificationschedule = {
    //   method: "get",
    //   url: `${this.baseURL}Notificationschedule/${osid}`,
    //   headers: {
    //     Authorization: request.headers.authorization,
    //   },
    // };

    // const cronTime = await axios(notificationschedule);

    // date = cronTime.data.scheduleDate;

    //Thu Jun 23 16:56:47 UTC 2022
    var yy = date.slice(0, 4);
    let year = parseInt(yy);

    var dd = date.slice(-2);
    let d = parseInt(dd)

    var mm = date.slice(5, 7);
    let mon = parseInt(mm);
    mon = mon-1;
   
    let hrs = parseInt(hours);
    let mins = +minutes;

   let ist = new Date(year, mon, d, hrs, mins);
   let utc = moment.utc(ist).format("YYYY-MM-DD HH:mm:ss ")
   let utcMin = utc.slice(14,16)
   let utcHrs = utc.slice(11,13)
   let utcDay = utc.slice(8,11)
   let utcMon = utc.slice(5,7)

    const job = new CronJob(
      `0 ${utcMin} ${utcHrs} ${utcDay} ${utcMon} *`,
      async () => {
        var axios = require("axios");
        const result = Math.random().toString(27).substring(6, 8);
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
          url: `${process.env.UCIAPI}/conversationLogic/create`,
          headers: {
            "admin-token": process.env.UCIADMINTOKEN,
            "Content-Type": "application/json",
          },
          data: conversationData,
        };

        
        const response = await axios(config);
        
        const resData = response.data;
        
        const consversationLogicID = resData.result.data.id;

        if (
          params.module[module] &&
          params.module[module].eventTrigger[eventTrigger]
        ) {
          // Bot Logic
          var botData = {
            data: {
              startingMessage: `Hi Shiksha ${channel} Broadcast ${result}`,
              name: `Shiksha Notification Broadcast ${result}`,
              users: [params.todaySegment],
              logic: [consversationLogicID],
              status: "enabled",
              startDate: moment().format("Y-MM-DD"),
              endDate: moment().format("Y-MM-DD"),
            },
          };

          var botConfig = {
            method: "post",
            url: `${process.env.UCIAPI}/bot/create`,
            headers: {
              "admin-token": process.env.UCIADMINTOKEN,
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
          // Notification Log

          var notificationData = {
            
              medium: channel,
              templateId: templateId,
              recepients: [params.todaySegment],
              sentDate: new Date(),
              sentBy: sentBy,
              module: module,
              options: contentData.body,
              scheduleDate: date,
              hours,
              minutes,
              month,
            
          };
          var logConfig = {
            method: "post",
            url: `${process.env.BASEAPIURL}Notificationlog`,
            headers: {
              Authorization: request.headers.authorization,
            },
            data: notificationData,
          };
          const logRes = await axios(logConfig);

          
          var deleteCron ={
            method:"delete",
            url:`${this.baseURL}Notificationschedule/${osid}`,
            headers: {
              Authorization: request.headers.authorization,
            },
          };
          const deletedNotification = await axios(deleteCron);

        } else {
            return "module not found";
        }

        job.stop();
      }
    );

    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();


    return `SMS set for EOD at `;
  
    }

  public async saveNotificationLog(notificationData: any, request: any) {
    var axios = require("axios");
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
      data: logResponse,
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



  //schedule
  public async searchSchedulehNotification(
    request: any,
    notificationSearchDto: NotificationSearchDto
  ) {
    return this.httpService
      .post(`${this.baseURL}/Notificationschedule/search`, notificationSearchDto, {
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

  public async getScheduleNotification(ScheduleNotificationid: string, request: any) {
    return this.httpService
      .get(`${this.baseURL}/Notificationschedule/${ScheduleNotificationid}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let scheduleNotificationData = axiosResponse.data;
          const templateDto = new NotificationLogDto(scheduleNotificationData);

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

}