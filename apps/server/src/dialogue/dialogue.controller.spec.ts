import { Test, TestingModule } from "@nestjs/testing";
import { DialogueController } from "./dialogue.controller";
import { DialogueService } from "./dialogue.service";

describe("DialogueController", () => {
  let controller: DialogueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DialogueController],
      providers: [DialogueService],
    }).compile();

    controller = module.get<DialogueController>(DialogueController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
