/* eslint-disable */
/** 編集対象の希望条件取得レスポンスのDTO */
export type DesiredConditionForEditDto = {
	jobSeekingStatus: 'notSeeking' | 'seeking';
	expectedStartTimings:
		| 'not_setted'
		| 'immediately'
		| 'withinMonth'
		| 'withinNextMonth'
		| 'withinTwoMonths'
		| 'withinThreeMonths'
		| 'withinFourMonths'
		| 'withinFiveMonths'
		| 'withinSixMonths'
		| 'anytime';
	minWorkingTimes:
		| 'not_setted'
		| 'oneDayToAWeek'
		| 'twoDaysToAWeek'
		| 'threeDaysToAWeek'
		| 'fourDaysToAWeek'
		| 'fiveDaysToAWeek';
	maxWorkingTimes:
		| 'not_setted'
		| 'oneDayToAWeek'
		| 'twoDaysToAWeek'
		| 'threeDaysToAWeek'
		| 'fourDaysToAWeek'
		| 'fiveDaysToAWeek';
	workingTimeZone:
		| 'not_setted'
		| 'daytimeWorkday'
		| 'morningNightWorkdayOrHoliday'
		| 'anytime';
	remortWork:
		| 'not_setted'
		| 'noDetailed'
		| 'office'
		| 'partRemort'
		| 'remortMain'
		| 'fullRemort';
	remarks: string;
	desiredPriorityConditions: {
		priority?: number | undefined;
		condition?:
			| 'not_setted'
			| 'revenue'
			| 'remort'
			| 'working_date'
			| 'industry'
			| 'skill'
			| 'experience'
			| 'want_to_acquire_skill'
			| 'company_scale'
			| undefined;
	}[];
};

/** 希望条件更新のrequest DTO */
export type UpdateDesiredConditionDto = {
	jobSeekingStatus: 'notSeeking' | 'seeking';
	expectedStartTimings:
		| 'not_setted'
		| 'immediately'
		| 'withinMonth'
		| 'withinNextMonth'
		| 'withinTwoMonths'
		| 'withinThreeMonths'
		| 'withinFourMonths'
		| 'withinFiveMonths'
		| 'withinSixMonths'
		| 'anytime';
	minWorkingTimes:
		| 'not_setted'
		| 'oneDayToAWeek'
		| 'twoDaysToAWeek'
		| 'threeDaysToAWeek'
		| 'fourDaysToAWeek'
		| 'fiveDaysToAWeek';
	maxWorkingTimes:
		| 'not_setted'
		| 'oneDayToAWeek'
		| 'twoDaysToAWeek'
		| 'threeDaysToAWeek'
		| 'fourDaysToAWeek'
		| 'fiveDaysToAWeek';
	workingTimeZone:
		| 'not_setted'
		| 'daytimeWorkday'
		| 'morningNightWorkdayOrHoliday'
		| 'anytime';
	remortWork:
		| 'not_setted'
		| 'noDetailed'
		| 'office'
		| 'partRemort'
		| 'remortMain'
		| 'fullRemort';
	remarks: string;
	desiredPriorityConditions: {
		priority?: number | undefined;
		condition?:
			| 'not_setted'
			| 'revenue'
			| 'remort'
			| 'working_date'
			| 'industry'
			| 'skill'
			| 'experience'
			| 'want_to_acquire_skill'
			| 'company_scale'
			| undefined;
	}[];
};

/** プロフィール作成のresponse DTO */
export type UpdateDesiredConditionResponseDto = {
	desiredCondition: {
		jobSeekingStatus: 'notSeeking' | 'seeking';
		expectedStartTimings:
			| 'not_setted'
			| 'immediately'
			| 'withinMonth'
			| 'withinNextMonth'
			| 'withinTwoMonths'
			| 'withinThreeMonths'
			| 'withinFourMonths'
			| 'withinFiveMonths'
			| 'withinSixMonths'
			| 'anytime';
		minWorkingTimes:
			| 'not_setted'
			| 'oneDayToAWeek'
			| 'twoDaysToAWeek'
			| 'threeDaysToAWeek'
			| 'fourDaysToAWeek'
			| 'fiveDaysToAWeek';
		maxWorkingTimes:
			| 'not_setted'
			| 'oneDayToAWeek'
			| 'twoDaysToAWeek'
			| 'threeDaysToAWeek'
			| 'fourDaysToAWeek'
			| 'fiveDaysToAWeek';
		workingTimeZone:
			| 'not_setted'
			| 'daytimeWorkday'
			| 'morningNightWorkdayOrHoliday'
			| 'anytime';
		remortWork:
			| 'not_setted'
			| 'noDetailed'
			| 'office'
			| 'partRemort'
			| 'remortMain'
			| 'fullRemort';
		remarks: string;
		desiredPriorityConditions: {
			priority?: number | undefined;
			condition?:
				| 'not_setted'
				| 'revenue'
				| 'remort'
				| 'working_date'
				| 'industry'
				| 'skill'
				| 'experience'
				| 'want_to_acquire_skill'
				| 'company_scale'
				| undefined;
		}[];
	};

	errors: {
		key: string;
		messages: string[];
	}[];
};
