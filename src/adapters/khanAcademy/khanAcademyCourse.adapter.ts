import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { IServicelocator } from "../courseservicelocator";

export const KhanAcademyCourseToken = "KhanAcademyCourse";
@Injectable()
export class KhanAcadermyCourseService implements IServicelocator {
  constructor(private httpService: HttpService) {}

  public async getAllCourse(
    subject: [string],
    audience: [string],
    className: [string],
    medium: [string],
    request: any
  ) {}

  public async getCoursesByIds(courseIds: [string], request: any) {}

  public async getCourseDetail(courseId: string, request: any) {}
}
