import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../announcementsservicelocator";
import { AnnouncementsDto } from "src/announcements/dto/announcements.dto";

export const ESamwadAnnouncementsToken = "ESamwadAnnouncements";
@Injectable()
export class AnnouncementsEsamwadService implements IServicelocator {
  constructor(private httpService: HttpService) { }
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;

  //to get details of a given announcement
  public async getAnnouncement(announcementId: string, request: any) {
    var axios = require("axios");
    var data = {
      query: `query getAnnouncement($id:Int!) {
        announcements(where: {id: {_eq: $id}}) {
          id,
          title,
          status,
          type,
          modified_at,
          data,
          is_pinned,
          is_dismissable,
          additional_tags,
        }
      }`,
      variables: {
        id: announcementId,
      },
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

    const responseData = await axios(config);
    const response = responseData.data.data.announcements;

    const responsedata = response.map(
      (item: any) => new AnnouncementsDto(item)
    );
    console.log(responsedata);
    let x= new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
    console.log(x.data);
    return x;
  }

  //to get the data of announcements by page
  public async getAnnouncementSet(request: any, pageIndex: number, pageSize: number) {
    var axios = require("axios");

    //TO-DO Get count of rows from db
    var data = {
      query: `query getAnnouncementSet($pi:Int!,$ps:Int!){
        announcements(order_by: {modified_at: desc}, offset: $pi, limit: $ps) {
          id
          title
          status
          type
          modified_at
          data
          is_pinned
          is_dismissable
          additional_tags
        }
      }
      `,
      variables: {
        pi: pageIndex,
        ps: pageSize
      },
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

    const responseData = await axios(config);
    const response = responseData.data.data.announcements;
    console.log(data.variables, responseData.data);
    const responsedata = response.map(
      (item: any) => new AnnouncementsDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
  }

  //to update a given announcement
  public async updateAnnouncement(
    announcementId: string,
    request: any,
    announcementsData: AnnouncementsDto
  ) {
    var axios = require("axios");
    let isPresent: any;

    var updateData = {
      query: `mutation updateAnnouncements($id: Int!, $additional_tags: _text = "", $data: String = "", $is_dismissable: Boolean = false, $is_pinned: Boolean = false, $modified_at: timestamp = "", $status: String = "", $title: String = "", $type: String = "") {
        update_announcements(_set: {additional_tags: $additional_tags, data: $data, is_dismissable: $is_dismissable, is_pinned: $is_pinned, modified_at: $modified_at, status: $status, title: $title, type: $type}, where: {id: {_eq: $id}}) {
          affected_rows
        }}`,
      variables: {
        id: announcementId,
        additional_tags: announcementsData.additionalTags,
        data: announcementsData.data,
        is_dismissable: announcementsData.pinnedAnnouncementProperties?.is_dismissable,
        is_pinned: announcementsData.isPinned,
        modified_at: new Date().toISOString(),
        status: announcementsData.status,
        title: announcementsData.title,
        type: announcementsData.announcementType,
      },
    };
    console.log(updateData.variables);
    var updateConfig = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: updateData,
    };

    const responseData = await axios(updateConfig);
    const response = responseData.data;

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: response,
    });
  }
}
