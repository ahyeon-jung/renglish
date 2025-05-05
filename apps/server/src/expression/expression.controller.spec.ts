import { Test, TestingModule } from "@nestjs/testing";
import { ExpressionController } from "./expression.controller";
import { ExpressionService } from "./expression.service";

describe("ExpressionController", () => {
  let controller: ExpressionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpressionController],
      providers: [ExpressionService],
    }).compile();

    controller = module.get<ExpressionController>(ExpressionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
