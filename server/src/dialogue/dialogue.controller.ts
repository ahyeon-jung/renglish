import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';

@ApiTags('Dialogues')
@Controller('dialogue')
export class DialogueController {
  constructor(private readonly dialogueService: DialogueService) {}

  @Post('/:sceneId/:speakerId')
  @ApiParam({
    name: 'speakerId',
    description: '발화자의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiParam({
    name: 'sceneId',
    description: '장면 ID',
    example: 'abc123-xyz456',
    type: String,
  })
  @ApiOperation({
    summary: '대사 정보 생성하기',
    description: '새로운 대사 정보를 생성합니다.',
  })
  @ApiBody({ type: CreateDialogueDto })
  createDialogue(
    @Param('speakerId') speakerId: string,
    @Param('sceneId') sceneId: string,
    @Body() createDialogueDto: CreateDialogueDto,
  ) {
    return this.dialogueService.create(speakerId, sceneId, createDialogueDto);
  }

  @Put('/:dialogueId')
  @ApiParam({
    name: 'dialogueId',
    description: '대사의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: '대사 정보 변경하기',
    description: '대사 정보를 변경합니다.',
  })
  @ApiBody({ type: UpdateDialogueDto })
  updateDialogue(
    @Param('dialogueId') dialogueId: string,
    @Body() updateDialogueDto: UpdateDialogueDto,
  ) {
    return this.dialogueService.update(dialogueId, updateDialogueDto);
  }
}
