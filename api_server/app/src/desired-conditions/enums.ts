// JobSeekingStatus
export enum JobSeekingStatus {
  NOT_SETTED = 'not_setted',
  NOT_SEEKING = 'notSeeking',
  SEEKING = 'seeking',
}
export const JobSeekingStatusDisplayValues = [
  { value: 'notSeeking', name: '案件を探していない' },
  { value: 'seeking', name: '案件を探している' },
];

// ExpectedStartTimings
export enum ExpectedStartTimings {
  NOT_SETTED = 'not_setted',
  IMMEDIATELY = 'immediately',
  WITHIN_MONTH = 'withinMonth',
  WITHIN_NEXT_MONTH = 'withinNextMonth',
  WITHIN_TWO_MONTH = 'withinTwoMonths',
  WITHIN_THREE_MONTH = 'withinThreeMonths',
  WITHIN_FOUR_MONTH = 'withinFourMonths',
  WITHIN_FIVE_MONTH = 'withinFiveMonths',
  WITHIN_SIX_MONTH = 'withinSixMonths',
  ANYTIME = 'anytime',
}
export const ExpectedStartTimingsDisplayValues = [
  { value: 'not_setted', name: '--' },
  { value: 'immediately', name: '即時' },
  { value: 'withinMonth', name: '今月中' },
  { value: 'withinNextMonth', name: '来月中' },
  { value: 'withinTwoMonths', name: '2ヶ月以内' },
  { value: 'withinThreeMonths', name: '3ヶ月以内' },
  { value: 'withinFourMonths', name: '4ヶ月以内' },
  { value: 'withinFiveMonths', name: '5ヶ月以内' },
  { value: 'withinSixMonths', name: '6ヶ月以内' },
  { value: 'anytime', name: 'いつでも' },
];

// WorkingTimes
export enum WorkingTimes {
  NOT_SETTED = 'not_setted',
  ONE_DAY_TO_A_WEEK = 'oneDayToAWeek',
  TWO_DAYS_TO_A_WEEK = 'twoDaysToAWeek',
  THREE_DAYS_TO_A_WEEK = 'threeDaysToAWeek',
  FOUR_DAYS_TO_A_WEEK = 'fourDaysToAWeek',
  FIVE_DAYS_TO_A_WEEK = 'fiveDaysToAWeek',
}
export const WorkingTimesDisplayValues = [
  { value: 'not_setted', name: '--' },
  { value: 'oneDayToAWeek', name: '週1(8時間)' },
  { value: 'twoDaysToAWeek', name: '週2(16時間)' },
  { value: 'threeDaysToAWeek', name: '週3(24時間)' },
  { value: 'fourDaysToAWeek', name: '週4(32時間)' },
  { value: 'fiveDaysToAWeek', name: '週5(40時間)' },
];

// WorkingTimeZones
export enum WorkingTimeZones {
  NOT_SETTED = 'not_setted',
  DAYTIME_WORKDAY = 'daytimeWorkday',
  MORNING_NIGHT_WORKDAY_OR_HOLIDAY = 'morningNightWorkdayOrHoliday',
  ANYTIME = 'anytime',
}
export const WorkingTimeZonesDisplayValues = [
  { value: 'not_setted', name: '--' },
  { value: 'daytimeWorkday', name: '平日日中のみ' },
  {
    value: 'morningNightWorkdayOrHoliday',
    name: '平日朝夜と休日のみ',
  },
  { value: 'anytime', name: 'いつでも' },
];

// RemortWork
export enum RemortWork {
  NOT_SETTED = 'not_setted',
  NO_DETAILED = 'noDetailed',
  OFFICE = 'office',
  PART_REMORT = 'partRemort',
  REMORT_MAIN = 'remortMain',
  FULL_REMORT = 'fullRemort',
}
export const RemortWorkDisplayValues = [
  { value: 'not_setted', name: '--' },
  {
    value: 'noDetailed',
    name: '特になし(リモート・オフラインどちらも可)',
  },
  {
    value: 'office',
    name: 'オフラインメイン',
  },
  { value: 'partRemort', name: '一部リモート' },
  { value: 'remortMain', name: 'リモートメイン' },
  { value: 'fullRemort', name: 'フルリモート' },
];
