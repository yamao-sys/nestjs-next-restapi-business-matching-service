import { ApiProperty } from '@nestjs/swagger';

export class ValidateSignUpResponseDto {
  @ApiProperty({
    example: {
      email: ['メールアドレスは必須です。'],
      password: ['パスワードは必須です。'],
    },
  })
  errors: { email?: Array<string>; password?: Array<string> };
}
