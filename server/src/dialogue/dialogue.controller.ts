import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DialogueService } from "./dialogue.service";
import { CreateDialogueDto } from "./dto/create-dialogue.dto";
import { UpdateDialogueDto } from "./dto/update-dialogue.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Dialogue } from "./entities/dialogue.entity";

@ApiTags("Dialogues")
@Controller("dialogue")
export class DialogueController {
  constructor(private readonly dialogueService: DialogueService) {}

  @Post()
  create(@Body() createDialogueDto: CreateDialogueDto) {
    return this.dialogueService.create(createDialogueDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all dialogues" })
  @ApiResponse({
    status: 200,
    description: "List of all movies.",
    type: [Dialogue],
  })
  findAll() {
    return this.dialogueService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dialogueService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDialogueDto: UpdateDialogueDto
  ) {
    return this.dialogueService.update(+id, updateDialogueDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.dialogueService.remove(+id);
  }
}
