import { ApiProperty } from '@nestjs/swagger';
import { CurrentEmployment } from '../entities/profile.entity';

export class UpdateProfileResponseDto {
  lastName: string;
  firstName: string;
  birthday: string;
  currentEmployment: CurrentEmployment;
  inWorkingCompanyName: string;
  tel: string;
  @ApiProperty({
    example: ['姓は必須です。'],
  })
  errors: {
    key?:
      | 'lastName'
      | 'firstName'
      | 'birthday'
      | 'currentEmployment'
      | 'inWorkingCompanyName'
      | 'tel';
    messages?: [];
  }[];
}
