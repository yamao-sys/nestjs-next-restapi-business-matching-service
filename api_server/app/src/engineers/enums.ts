// CurrentEmployment
export enum CurrentEmployment {
  FLEELANCE = 'fleelance',
  FULLTIME = 'fulltime',
  OTHER = 'other',
}
export const CurrentEmploymentDisplayValues = [
  { value: 'fleelance', name: 'フリーランス' },
  { value: 'fulltime', name: '正社員' },
  { value: 'other', name: 'その他' },
];

// ExperiencedDuration
export enum ExperiencedDuration {
  LESS_THAN_ONE_YEAR = 'lessThanOneYear',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  EXPERT = 'expert',
}
export const ExperiencedDurationDisplayValues = [
  { value: 'lessThanOneYear', name: '〜1年' },
  { value: 'junior', name: '1〜2年' },
  { value: 'middle', name: '2〜3年' },
  { value: 'senior', name: '3〜5年' },
  { value: 'expert', name: '10年〜' },
];
