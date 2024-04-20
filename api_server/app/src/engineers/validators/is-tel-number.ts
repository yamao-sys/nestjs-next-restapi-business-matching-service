import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTelNumber' })
export class IsTelNumber implements ValidatorConstraintInterface {
  validate(text: string) {
    const pattern = /^[0-9]{10,11}$/;
    return typeof text === 'string' && pattern.test(text);
  }

  defaultMessage() {
    return '電話番号は0001111222の形式で入力をお願いします。';
  }
}
