// PriorityCondition
export enum PriorityCondition {
  NOT_SETTED = 'not_setted',
  REVENUE = 'revenue',
  REMORT = 'remort',
  WORKING_DATE = 'working_date',
  INDUSTRY = 'industry',
  SKILL = 'skill',
  EXPERIENCE = 'experience',
  WANT_TO_ACQUIRE_SKILL = 'want_to_acquire_skill',
  COMPANY_SCALE = 'company_scale',
}
export const PriorityConditionDisplayValues = [
  { value: 'not_setted', name: '--' },
  {
    value: 'revenue',
    name: '収入',
  },
  {
    value: 'remort',
    name: 'リモート可',
  },
  { value: 'working_date', name: '稼働日・時間' },
  { value: 'industry', name: '分野・業界' },
  { value: 'skill', name: '活かしたいスキル' },
  { value: 'experience', name: '活かしたい経験' },
  {
    value: 'want_to_acquire_skill',
    name: '新たに習得したい技術・経験',
  },
  { value: 'company_scale', name: '企業規模' },
];
