import { PartialType } from '@nestjs/swagger';
import { CreateSpeakerDto } from './create-speaker.dto';

export class UpdateSpeakerDto extends PartialType(CreateSpeakerDto) {}
