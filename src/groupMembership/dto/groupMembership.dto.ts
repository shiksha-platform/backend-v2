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

  constructor(partial: GroupMembershipDto) {
    Object.assign(this, partial);
    this.groupMembershipId = `${this.groupMembershipId}`;
    this.groupId = `${this.groupId}`;
    this.schoolId = `${this.schoolId}`;
    this.userId = `${this.userId}`;
    this.role = `${this.role}`;
  }
}
