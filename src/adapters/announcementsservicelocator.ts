import { AnnouncementsFilterDto } from "src/announcements/dto/announcements-filter.dto";
import { AnnouncementsDto } from "src/announcements/dto/announcements.dto";

export interface IServicelocator {
  getAnnouncement(announcementId: any, request: any);
  getAnnouncementSet(request: any, filters?: AnnouncementsFilterDto);
  updateAnnouncement(
    announcementId: string,
    request: any,
    announcementData: AnnouncementsDto
  );
  createAnnouncement(request: any, announcementData: AnnouncementsDto);
  deleteAnnouncement(announcementId: string, request: any);
}
