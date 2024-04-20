/* eslint-disable */
/** 経験スキルのマスタのresponse DTO */
export type FetchExperiencedEntityMasterResponse = {
	professions: {
		id: string;
		name: string;
	}[];
	programmingLanguages: {
		id: string;
		name: string;
	}[];
};

export type Profession = {
	id: string;
	name: string;
};

export type ProgrammingLanguage = {
	id: string;
	name: string;
};
