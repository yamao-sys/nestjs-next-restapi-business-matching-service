/* eslint-disable */
import type * as Types from '../@types';

export type Methods = {
	/** 経験スキルのマスタの取得 */
	get: {
		status: 200;
		/** 経験スキルのマスタの取得成功 */
		resBody: Types.FetchExperiencedEntityMasterResponse;
	};
};
