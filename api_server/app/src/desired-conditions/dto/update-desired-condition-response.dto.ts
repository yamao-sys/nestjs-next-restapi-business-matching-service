import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DesiredConditionDto } from './desired-condition.dto';

export class UpdateDesiredConditionResponseDto extends PartialType(
  DesiredConditionDto,
) {
  @ApiProperty({
    example: ['姓は必須です。'],
  })
  errors: {
    key?: string;
    messages?: [];
  }[];
}
