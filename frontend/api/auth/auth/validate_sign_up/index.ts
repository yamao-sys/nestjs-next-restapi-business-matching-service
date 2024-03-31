/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
	/** 会員登録の入力バリデーション */
	post: {
		status: 200;
		/** バリデーションエラーの返却 */
		resBody: Types.ValidateSignUpResponseDto;
		reqBody: Types.SignUpDto;
	};
};
