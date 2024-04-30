/* eslint-disable */
/** 希望条件編集のセレクトボックスのoptionの取得レスポンスのDTO */
export type DesiredConditionSelectValues = {
	jobSeekingStatus: {
		value: string;
		name: string;
	}[];
	expectedStartTimings: {
		value: string;
		name: string;
	}[];
	workingTimes: {
		value: string;
		name: string;
	}[];
	workingTimeZone: {
		value: string;
		name: string;
	}[];
	remortWork: {
		value: string;
		name: string;
	}[];
	desiredPriorityCondition: {
		value: string;
		name: string;
	}[];
};
