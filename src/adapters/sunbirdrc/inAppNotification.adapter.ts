import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { GroupDto } from "src/group/dto/group.dto";
import moment from "moment";

@Injectable()
export class InAppNotificationService {
  constructor(private httpService: HttpService) {}
  url = process.env.HISTORYAPIURL;
  UCIURL = process.env.UCIAPI;
  templaterURL = process.env.TEMPLATERURL;
  groupURL = `${process.env.BASEAPIURL}/Class`;
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

  public async inAppNotification(
    module: string,
    groupId: string,
    request: any,
    templateId: string
  ) {
    try {
      var axios = require("axios");
      const result = Math.random().toString(27).substring(1, 8);
      var confi = {
        method: "get",
        url: `${this.templaterURL}${templateId}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const getContent = await axios(confi);
      const contentData = getContent.data;

      // Conversation Logic
      var conversationData = {
        data: {
          name: `Firebase Broadcast ${result}`,
          transformers: [
            {
              id: process.env.TRANSFORMERSID,
              meta: {
                body: contentData.body,
                type: contentData.type,
                params: ["name", "phoneNo"],
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

      const dtoResponse = await this.GroupMappedResponse(responseData.data);

      const filterObj = dtoResponse.filter((e: any) => e);
      let option = filterObj[0].option;
      let optionStr = JSON.stringify(option);
      var jsonObj = JSON.parse(optionStr);
      let params = JSON.parse(jsonObj);

      var botData = {
        data: {
          startingMessage: `Hi Shiksha Firebase Broadcast ${result}`,
          name: `Shiksha Firebase Broadcast ${result}`,
          users: [params.inAppNotification.teacherSegment],
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
      const botCreateID = botResData.result.data.id;

      var configs = {
        method: "get",
        url: `${process.env.BOTCALL}${botCreateID}`,
        headers: {},
      };

      const botres = await axios(configs);

      const sendData = botres.data;

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: sendData,
      });
    } catch (e) {
      return { data: e.response.data };
    }
  }

  public async readReceipt(
    eventType: string,
    externalId: string,
    destAdd: string,
    fcmDestAdd: string,
    messageId: string,
    text: string,
    from: string,
    request: any
  ) {
    var axios = require("axios");
    var data = {
      text: text,
      from: from,
      messageId: messageId,
      eventType: eventType,
      report: {
        externalId: externalId,
        destAdd: destAdd,
        fcmDestAdd: fcmDestAdd,
      },
    };

    var config = {
      method: "post",
      url: "http://139.59.14.252:9080/firebase/web",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: response.data,
    });
  }
  public async GroupMappedResponse(result: any) {
    const groupResponse = result.map((item: any) => {
      const groupMapping = {
        groupId: item?.groupId ? `${item.groupId}` : "",
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
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
      };
      return new GroupDto(groupMapping);
    });

    return groupResponse;
  }
}
