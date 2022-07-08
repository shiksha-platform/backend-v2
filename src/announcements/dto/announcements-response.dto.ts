/* eslint-disable prettier/prettier */
interface IAdditionalTags {
  name: string;
  data: string;
}

interface IPinnedAnnouncementProperties {
  isDismissable?: boolean;
  color?: string;
}
export interface AnnouncementsResponseDto {
  name: string;
  dateModified: Date;
  type: string;
  data?: string;
  additionalTags?: IAdditionalTags[];
  pinnedAnnouncementProperties?: IPinnedAnnouncementProperties;
}
