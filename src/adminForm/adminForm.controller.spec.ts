import { Test, TestingModule } from "@nestjs/testing";
import { AdminFormController } from "./adminForm.controller";

describe("AdminFormController", () => {
  let controller: AdminFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminFormController],
    }).compile();

    controller = module.get<AdminFormController>(AdminFormController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
