import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class GroupMembershipDto {
  @Expose()
  groupMembershipId: string;

  @ApiProperty()
  @Expose()
  groupId: string;

  @ApiProperty()
  @Expose()
  schoolId: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  role: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;

  constructor(obj: any) {
    this.groupMembershipId = obj?.groupMembershipId
      ? `${obj.groupMembershipId}`
      : "";
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.role = obj?.role ? `${obj.role}` : "";
    this.created_at = obj?.created_at ? `${obj.created_at}` : "";
    this.updated_at = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
