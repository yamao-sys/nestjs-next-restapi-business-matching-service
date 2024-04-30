/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
	/** 希望条件編集のセレクトボックスのオプション取得 */
	get: {
		status: 200;
		/** 希望条件編集のセレクトボックスのオプション取得成功 */
		resBody: Types.DesiredConditionSelectValues;
	};
};
