import { PartialType } from '@nestjs/swagger';
import { DesiredConditionDto } from './desired-condition.dto';

export class UpdateDesiredConditionDto extends PartialType(
  DesiredConditionDto,
) {}
