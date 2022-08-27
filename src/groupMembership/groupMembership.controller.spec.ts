import { Test, TestingModule } from "@nestjs/testing";
import { GroupMembershipService } from "src/adapters/hasura/groupMembership.adapter";
import { GroupMembershipController } from "./groupMembership.controller";

describe("GroupMembershipController", () => {
  let controller: GroupMembershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMembershipController],
      providers: [GroupMembershipService],
    }).compile();

    controller = module.get<GroupMembershipController>(
      GroupMembershipController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
