import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { IServicelocator } from "../contentpagesservicelocator";

export const ESamwadContentPagesToken = "ESamwadContentPages";

@Injectable()
export class ContentPagesEsamwadService implements IServicelocator {
    constructor(private httpService: HttpService) { }
    baseURL = process.env.HASURAURL;
    adminSecret = process.env.ADMINSECRET;
}