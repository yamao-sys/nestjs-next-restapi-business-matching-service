/* eslint-disable */
/** 会員登録のリクエストのDTO */
export type SignUpDto = {
	email: string;
	password: string;
};

/** 会員登録の入力値チェックのレスポンス */
export type ValidateSignUpResponseDto = {
	errors: {
		email?: string[] | undefined;
		password?: string[] | undefined;
	};
};

/** 会員登録のレスポンス */
export type SignUpResponseDto = {
	errors: {
		email?: string[] | undefined;
		password?: string[] | undefined;
	};
};

/** Sign in params. */
export type SignInDto = {
	email: string;
	password: string;
	errors?: string[] | undefined;
};

/** ログインのレスポンス */
export type SignInResponseDto = {
	errors: string[];
};

/** バリデーションエラー */
export type ValidationErrorResponseDto = {
	statusCode: number;
	message: string[];
	error: string;
};
