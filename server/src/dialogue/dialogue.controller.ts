import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';
import { TAG } from 'src/common/constants/tag';
import { AdminTokenGuard } from 'src/auth/guards/admin-token.guard';

@ApiTags('Dialogues')
@Controller('dialogues')
export class DialogueController {
  constructor(private readonly dialogueService: DialogueService) {}

  @Post('/:sceneId/:speakerId')
  @UseGuards(AdminTokenGuard)
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
    summary: `대사 정보 생성 ${TAG.ADMIN_REQUIRED}`,
    description: '새로운 대사 정보를 생성합니다.',
  })
  @ApiBody({ type: CreateDialogueDto })
  createDialogue(
    @Param('speakerId') speakerId: string,
    @Param('sceneId') sceneId: string,
    @Body() createDialogueDto: CreateDialogueDto,
  ) {
    return this.dialogueService.create(sceneId, speakerId, createDialogueDto);
  }

  @Put('/:dialogueId')
  @UseGuards(AdminTokenGuard)
  @ApiParam({
    name: 'dialogueId',
    description: '대사의 ID',
    example: 'e5e798e1-9241-4b95-8e2c-0b630bbd033f',
    type: String,
  })
  @ApiOperation({
    summary: `대사 정보 변경 ${TAG.ADMIN_REQUIRED}`,
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
