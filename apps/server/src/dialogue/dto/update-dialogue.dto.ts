import { PartialType } from "@nestjs/swagger";
import { CreateDialogueDto } from "./create-dialogue.dto";

export class UpdateDialogueDto extends PartialType(CreateDialogueDto) {}
