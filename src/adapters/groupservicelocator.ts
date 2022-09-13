import { GroupSearchDto } from "src/group/dto/group-search.dto";
import { GroupDto } from "src/group/dto/group.dto";

export interface IServicelocatorgroup {
  getGroup(groupId, request);
  createGroup(request: any, groupDto: GroupDto);
  updateGroup(groupId: string, request: any, groupDto: GroupDto);
  searchGroup(request: any, groupSearchDto: GroupSearchDto);
  findMembersOfGroup(id, role, request);
  findGroupsByUserId(id, role, request);
  findMembersOfChildGroup(groupId: string, role: string, request: any);
}
