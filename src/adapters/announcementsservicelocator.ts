import { AnnouncementsDto } from "src/announcements/dto/announcements.dto";

export interface IServicelocator {
  getAnnouncement(announcementId: any, request: any);
  getAnnouncementSet(request:any,pageSize:number,pageIndex:number);
  updateAnnouncement(
    announcementId:string,
    request:any,
    announcementData:AnnouncementsDto
  )
  createAnnouncement(request:any, announcementData:any)
}
