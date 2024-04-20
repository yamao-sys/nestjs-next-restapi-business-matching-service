/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
	/** ログインユーザのプロフィールを更新 */
	post: {
		status: 201;
		/** プロフィールの更新成功 */
		resBody: Types.UpdateProfileResponseDto;
		reqBody: Types.UpdateProfileDto;
	};

	/** 編集対象となるログインユーザのプロフィールを取得 */
	get: {
		status: 200;
		/** プロフィールの取得成功 */
		resBody: Types.ProfileForEditDto;
	};
};
