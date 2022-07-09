export interface IServicelocator {
  findMembersOfGroup(id, role, request);
  findGroupsByUserId(id, role, request);
}
