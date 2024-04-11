import { ValidationError } from 'class-validator';

export default function formatValidationErrors(errors: ValidationError[]) {
  const result: Array<{ key: string; messages: string[] }> = [];

  errors.forEach((error) => {
    // エラーメッセージを配列に格納
    const messages = [];
    for (const key in error.constraints) {
      messages.push(error.constraints[key]);
    }
    // 戻り値の配列にkey, messagesのhashを追加
    result.push({ key: error.property, messages });
  });

  return result;
}
