import { Test, TestingModule } from "@nestjs/testing";
import { AnnouncementsController } from "./announcements.controller";

describe("AnnouncementsController", () => {
  let controller: AnnouncementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementsController],
    }).compile();

    controller = module.get<AnnouncementsController>(AnnouncementsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
