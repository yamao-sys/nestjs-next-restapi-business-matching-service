/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
	/** ログインユーザの希望条件を更新 */
	post: {
		status: 201;
		/** 希望条件の更新成功 */
		resBody: Types.UpdateDesiredConditionResponseDto;
		reqBody: Types.UpdateDesiredConditionDto;
	};

	/** 編集対象となるログインユーザの希望条件を取得 */
	get: {
		status: 200;
		/** 希望条件の取得成功 */
		resBody: Types.DesiredConditionForEditDto;
	};
};
