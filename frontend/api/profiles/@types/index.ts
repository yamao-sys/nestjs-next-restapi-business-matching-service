/* eslint-disable */
/** 編集対象のプロフィール取得レスポンスのDTO */
export type ProfileForEditDto = {
	lastName: string;
	firstName: string;
	birthday: string;
	currentEmployment: 'fleelance' | 'fulltime' | 'other';
	inWorkingCompanyName: string;
	tel: string;
	latestProject: string;
	currentHourlyWage: number;
	experiencedDuration:
		| 'lessThanOneYear'
		| 'junior'
		| 'middle'
		| 'senior'
		| 'expert';
	selfPromotion: string;
	experiencedProfessions: {
		professionId?: string | undefined;
		experiencedDuration?:
			| 'lessThanOneYear'
			| 'junior'
			| 'middle'
			| 'senior'
			| 'expert'
			| undefined;
	}[];
	experiencedProgrammingLanguages: {
		programmingLanguageId?: string | undefined;
		experiencedDuration?:
			| 'lessThanOneYear'
			| 'junior'
			| 'middle'
			| 'senior'
			| 'expert'
			| undefined;
	}[];
	skillsheetName?: string | undefined;
	skillsheetData?: string | undefined;
};

/** TODO作成のrequest DTO */
export type UpdateProfileDto = {
	lastName: string;
	firstName: string;
	birthday: string;
	currentEmployment: 'fleelance' | 'fulltime' | 'other';
	inWorkingCompanyName: string;
	tel: string;
	latestProject: string;
	currentHourlyWage: number;
	experiencedDuration:
		| 'lessThanOneYear'
		| 'junior'
		| 'middle'
		| 'senior'
		| 'expert';
	selfPromotion: string;
	experiencedProfessions: {
		professionId?: string | undefined;
		experiencedDuration?:
			| 'lessThanOneYear'
			| 'junior'
			| 'middle'
			| 'senior'
			| 'expert'
			| undefined;
	}[];
	experiencedProgrammingLanguages: {
		programmingLanguageId?: string | undefined;
		experiencedDuration?:
			| 'lessThanOneYear'
			| 'junior'
			| 'middle'
			| 'senior'
			| 'expert'
			| undefined;
	}[];
	skillsheetName?: string | undefined;
	skillsheetData?: string | undefined;
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
		latestProject?: string | undefined;
		currentHourlyWage?: number | undefined;
		experiencedDuration?:
			| 'lessThanOneYear'
			| 'junior'
			| 'middle'
			| 'senior'
			| 'expert'
			| undefined;
		selfPromotion?: string | undefined;
		experiencedProfessions?:
			| {
					professionId?: string | undefined;
					experiencedDuration?:
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior'
						| 'expert'
						| undefined;
			  }[]
			| undefined;
		experiencedProgrammingLanguages?:
			| {
					programmingLanguageId?: string | undefined;
					experiencedDuration?:
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior'
						| 'expert'
						| undefined;
			  }[]
			| undefined;
		skillsheetName?: string | undefined;
		skillsheetData?: string | undefined;
	};

	errors: {
		key: string;
		messages: string[];
	}[];
};
