/* eslint-disable */
/** 編集対象のプロフィール取得レスポンスのDTO */
export type ProfileForEditDto = {
	lastName: string;
	firstName: string;
	birthday: string;
	currentEmployment: 'fleelance' | 'fulltime' | 'other';
	inWorkingCompanyName: string;
	tel: string;
};

/** TODO作成のrequest DTO */
export type UpdateProfileDto = {
	lastName: string;
	firstName: string;
	birthday: string;
	currentEmployment: 'fleelance' | 'fulltime' | 'other';
	inWorkingCompanyName: string;
	tel: string;
};

/** プロフィール作成のresponse DTO */
export type UpdateProfileResponseDto = {
	profile: {
		lastName?: string | undefined;
		firstName?: string | undefined;
		birthday?: string | undefined;
		currentEmployment?: 'fleelance' | 'fulltime' | 'other' | undefined;
		inWorkingCompanyName?: string | undefined;
		tel?: string | undefined;
	};

	errors: {
		key:
			| 'lastName'
			| 'firstName'
			| 'birthday'
			| 'currentEmployment'
			| 'inWorkingCompanyName'
			| 'tel';
		messages: string[];
	}[];
};
