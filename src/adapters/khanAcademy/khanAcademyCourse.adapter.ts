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

  public async getAllCoursesByCourseIds(courseIds: [string], request: any) {}

  public async getOneCourse(courseId: string, request: any) {}
}
