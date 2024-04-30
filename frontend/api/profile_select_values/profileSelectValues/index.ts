/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
	/** プロフィール編集のセレクトボックスのオプション取得 */
	get: {
		status: 200;
		/** プロフィール編集のセレクトボックスのオプション取得成功 */
		resBody: Types.ProfileSelectValues;
	};
};
