import { PartialType } from '@nestjs/swagger';
import { DesiredConditionDto } from './desired-condition.dto';

export class DesiredConditionForEditDto extends PartialType(
  DesiredConditionDto,
) {}
