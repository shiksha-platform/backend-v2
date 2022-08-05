import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { IServicelocator } from "../contentpagesservicelocator";
import { ContentPagesDto } from "src/contentPages/dto/contentPages.dto";
import { SuccessResponse } from "src/success-response";

export const ESamwadContentPagesToken = "ESamwadContentPages";

@Injectable()
export class ContentPagesEsamwadService implements IServicelocator {
  constructor(private httpService: HttpService) { }
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;


  //to create a content page
  public async createContentPage(request: any, contentPageData: ContentPagesDto) {
    var axios = require("axios");
    const blocksData = contentPageData.blocks.map(({ blockIndex, blockType, blockData }, idx) => ({ block_index: blockIndex, block_type: blockType, block_data: blockData, content_page_id: idx }));
    var data = {
      query: `mutation create_content_page($_slug: String, $_status: String,$_author: String, $_title: String, $_data: [blocks_insert_input!], $created_by: String, $modified_by: String) {
        insert_content_pages_one(object: {slug: $_slug, status: $_status, author: $_author, title: $_title, blocks: {data: $_data}, created_by: $_created_by, modified_by: $_modified_by}) {
          id
        }
      }
      `,
      variables: {
        _slug: contentPageData?.slugUrl,
        _title: contentPageData?.title,
        _status: contentPageData?.status,
        _data: blocksData,
        _author: contentPageData?.author,
        _created_by: "eyJhbGciOiJSUzI1NiIsInR5cCIgO",
        _modified_by: "eyJhbGciOiJSUzI1NiIsInR5cCIgO"
      }
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
        ContentPage: { osid: response.data.insert_content_pages_one.id },
      },
    };

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: final,
    });
  }
  //to get details of a given content page
  public async getContentPageData(contentPageSlug: string, request: any) {
    var axios = require('axios');
    var data = {
      query: `query getContentPageData($_slug: String!) {
                content_pages(where: {slug: {_eq: $_slug}}) {
                  modified_at
                  slug
                  title
                  status
                  id
                  blocks(order_by: {block_index: desc}) {
                    block_data
                    block_type
                    id
                  }
                }
              }
              `,
      variables: {
        _slug: contentPageSlug,
      }
    }

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
    const response = responseData.data.data.content_pages;

    const responsedata = response.map(
      (item: any) => new ContentPagesDto(item)
    );

    let x = new SuccessResponse({
      statusCode: 200,
      message: "OK",
      data: responsedata,
    });
    return x;
  }

  //to fetch content pages with given limit and offset
  public async getContentPagesSet(request: any, limit?: number, offset?: number) {
    var axios = require('axios');
    var data = {
      query: `query getContentPagesSet($_limit: Int, $_offset: Int) {
              content_pages(limit: $_limit, offset: $_offset, order_by: {modified_at: desc}) {
                id
                modified_at
                slug
                status
                title
              }
              content_pages_aggregate(limit: $_limit, offset: $_offset) {
                aggregate {
                  count
                }
              }
            }`,
      variables: {
        _limit: limit,
        _offset: offset,
      }
    }

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
    const response = responseData.data.data.content_pages;

    const responsedata = response.map(
      (item: any) => new ContentPagesDto(item)
    );

    let x = new SuccessResponse({
      statusCode: 200,
      message: "OK",
      data: {
        count: responseData.data.data.content_pages_aggregate.aggregate.count,
        data: responsedata
      },
    });
    return x;
  }

  //to update a content page data
  public async updateContentPageData(
    contentPageId: string,
    request: any,
    contentPageData: ContentPagesDto
  ) {
    var axios = require("axios");
    const pageId = parseInt(contentPageId);
    const blocksData = contentPageData.blocks.map(({ blockIndex, blockType, blockData }, idx) => ({ block_index: blockIndex, block_type: blockType, block_data: blockData, content_page_id: idx }));

    var updateData = {
      query: `mutation update_content_page_data($_id: Int!, $_author: String, $_modified_at: timestamptz, $_modified_by: String, $_slug: String, $_title: String, $_status: String, $_data: [blocks_insert_input!] = {}) {
        update_content_pages_by_pk(pk_columns: {id: $_id}, _set: {author: $_author, modified_at: $_modified_at, modified_by: $_modified_by, slug: $_slug, title: $_title, status: $_status}) {
          id
          slug
        }
        delete_blocks(where: {content_page_id: {_eq: $_id}}) {
          affected_rows
        }
        insert_blocks(objects: $_data) {
          affected_rows
        }
      }
      `,
      variables: {
        _id: pageId,
        _slug: contentPageData?.slugUrl,
        _author: contentPageData?.author,
        _status: contentPageData?.status,
        _title: contentPageData?.title,
        _modified_at: + new Date().toISOString(),
        _modified_by: "329uinfnf84f4jf94f",
        _data: blocksData
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

  //to delete a content page with given id
  public async deleteContentPage(contentPageId: string, request: any) {
    var axios = require("axios");
    var data = {
      query: `mutation delete_content_page($_id: Int!) {
        delete_content_pages_by_pk(id: $_id) {
          id
        }
      }`,
      variables: {
        _id: parseInt(contentPageId)
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
      message: "Deleted content page successfully",
      data: response,
    });
    return x;
  }
}