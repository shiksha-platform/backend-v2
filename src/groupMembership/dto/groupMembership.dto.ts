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

  constructor(obj: any) {
    this.groupMembershipId = `${obj.osid}`;
    this.groupId = `${obj.groupId}`;
    this.schoolId = `${obj.schoolId}`;
    this.userId = `${obj.userId}`;
    this.role = `${obj.role}`;
  }
}
