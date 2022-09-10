import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../announcementsservicelocator";
import { AnnouncementsDto } from "src/announcements/dto/announcements.dto";
import { AnnouncementsFilterDto } from "src/announcements/dto/announcements-filter.dto";

export const ESamwadAnnouncementsToken = "ESamwadAnnouncements";
@Injectable()
export class AnnouncementsEsamwadService implements IServicelocator {
  constructor(private httpService: HttpService) {}
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

    let responsedata = await this.mappedResponse(response);
    let x = new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
    return x;
  }

  //to get the data of announcements by page
  public async getAnnouncementSet(
    request: any,
    filters: AnnouncementsFilterDto
  ) {
    var axios = require("axios");

    //adding select clause to filters
    let selectClause = ``,
      queryVar = ``;
    let variables = {};

    //add corr select and data statement to query
    if (filters?.pageSize) {
      variables["_limit"] = parseInt(filters.pageSize);
    }
    if (filters?.pageIndex) {
      variables["_offset"] = parseInt(filters.pageIndex);
    }
    if (filters?.title) {
      variables["_title"] = `%${filters.title}%`;
      queryVar += `$_title: String,`;
      selectClause += `title: {_ilike: $_title}`;
    }
    if (filters?.author) {
      variables["_author"] = filters.author;
      queryVar += `$_author: [String],`;
      selectClause += `author:{_in: $_author},`;
    }
    if (filters?.isPinned) {
      variables["_isPinned"] = filters?.isPinned;
      queryVar += `$_isPinned: Boolean,`;
      selectClause += `is_pinned: {_eq: $_isPinned},`;
    }
    if (filters?.pinnedAnnouncementProperties) {
      variables["_isDismissable"] =
        filters?.pinnedAnnouncementProperties?.isDismissable;
      queryVar += `$_isDismissable: Boolean,`;
      selectClause += `is_dismissable: {_eq: $_isDismissable},`;
    }
    if (filters?.status) {
      variables["_status"] = filters?.status;
      queryVar += `$_status: String,`;
      selectClause += `status: {_ilike: $_status},`;
    }
    if (filters?.announcementType) {
      variables["_type"] = filters?.announcementType;
      queryVar += `$_type: [String]`;
      selectClause += `type: {_in: $_type},`;
    }
    if (filters?.startDate && filters?.endDate) {
      variables["_startDate"] = filters?.startDate;
      variables["_endDate"] = filters?.endDate;
      queryVar += `$_startDate: timestamptz, $_endDate: timestamptz,`;
      selectClause += `modified_at: {_gte: $_startDate, _lte: $_endDate},`;
    }

    let data = {
      query: `query get_announcement_set($_limit: Int, $_offset: Int, ${queryVar}) {
        announcements(limit: $_limit, offset: $_offset, order_by: {modified_at: desc}, where: { ${selectClause} }) {
          additional_tags
          author
          data
          id
          is_dismissable
          is_pinned
          modified_at
          status
          title
          type
        }
        announcements_aggregate(where: {${selectClause}}) {
          aggregate {
            count
          }
        }
      }
      `,
      variables: variables,
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
    let responsedata = await this.mappedResponse(response);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: {
        count: responseData.data.data.announcements_aggregate.aggregate.count,
        data: responsedata,
      },
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
      query: `mutation updateAnnouncements($id: Int!, $additional_tags: _text = "", $data: String = "", $is_dismissable: Boolean = false, $is_pinned: Boolean = false, $modified_at: timestamptz, $status: String = "",$author: String = "", $title: String = "", $type: String = "") {
        update_announcements(_set: {additional_tags: $additional_tags, data: $data, is_dismissable: $is_dismissable, is_pinned: $is_pinned, modified_at: $modified_at, status: $status,author: $author, title: $title, type: $type}, where: {id: {_eq: $id}}) {
          affected_rows
        }}`,
      variables: {
        id: parseInt(announcementId),
        additional_tags: `{${announcementsData.additionalTags.toString()}}`,
        data: announcementsData.data,
        is_dismissable:
          announcementsData.pinnedAnnouncementProperties?.is_dismissable,
        is_pinned: announcementsData.isPinned,
        modified_at: announcementsData.dateModified,
        status: announcementsData.status,
        author: announcementsData.author,
        title: announcementsData.title,
        type: announcementsData.announcementType,
      },
    };
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

  //to create an announcement
  public async createAnnouncement(request: any, announcementsData: any) {
    var axios = require("axios");
    var data = {
      query: `mutation createAnnouncement($additional_tags: _text, $data: String = "", $is_dismissable: Boolean = false, $is_pinned: Boolean = false, $status: String = "", $title: String = "", $type: String = "") {
          insert_announcements_one(object: {additional_tags: $additional_tags, data: $data, is_dismissable: $is_dismissable, is_pinned: $is_pinned, status: $status, title: $title, type: $type}) {
            id
          }
        }
        `,
      variables: {
        additional_tags: `{${announcementsData?.additionalTags?.toString()}}`,
        data: announcementsData.data,
        is_dismissable:
          announcementsData.pinnedAnnouncementProperties?.is_dismissable,
        is_pinned: announcementsData.isPinned,
        status: announcementsData.status,
        title: announcementsData.title,
        type: announcementsData.announcementType,
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
    const response = responseData.data;
    let final = {
      ...response,
      result: {
        Announcements: { osid: response.data.insert_announcements_one.id },
      },
    };

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: final,
    });
  }

  //to delete an announcement
  public async deleteAnnouncement(announcementId: string, request: any) {
    var axios = require("axios");
    var data = {
      query: `mutation delete_announcement($id: Int!) {
        delete_announcements_by_pk(id: $id){
          id
        }
      }
      `,
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
    const response = responseData.data.data;
    let x = new SuccessResponse({
      statusCode: 200,
      message: "Deleted announcement successfully",
      data: response,
    });
    return x;
  }

  public async mappedResponse(result: any) {
    const announcementResponse = result.map((obj: any) => {
      const announcementMapping = {
        announcementId: obj?.id ? `${obj.id}` : "",
        title: obj?.title ? `${obj.title}` : "",
        status: obj?.status ? `${obj.status}` : "",
        author: obj?.author ? `${obj.author}` : "",
        announcementType: obj?.type ? `${obj.type}` : "",
        dateModified: obj?.modified_at ? `${obj.modified_at}` : "",
        data: obj?.data ? `${obj.data}` : "",
        isPinned: obj?.is_pinned ? obj.is_pinned : false,
        additionalTags: obj?.additional_tags ? obj.additional_tags : [],
        pinnedAnnouncementProperties: {
          isDismissable: obj?.is_dismissable ?? false,
        },
      };
      return new AnnouncementsDto(announcementMapping);
    });

    return announcementResponse;
  }
}
