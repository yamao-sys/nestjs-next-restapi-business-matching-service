/* eslint-disable */
/** 編集対象のプロフィール取得レスポンスのDTO */
export type ProfileSelectValues = {
	currentEmployment: {
		value: string;
		name: string;
	}[];
	experiencedDuration: {
		value: string;
		name: string;
	}[];
	experiencedEntityDuration: {
		value: string;
		name: string;
	}[];
};
