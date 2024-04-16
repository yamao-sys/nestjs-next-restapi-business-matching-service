import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_24gfk4 } from './experiencedEntityMasters';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
	const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
	const PATH0 = '/experiencedEntityMasters';
	const GET = 'GET';

	return {
		experiencedEntityMasters: {
			/**
			 * 経験スキルのマスタの取得
			 * @returns 経験スキルのマスタの取得成功
			 */
			get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_24gfk4['get']['resBody'],
					BasicHeaders,
					Methods_24gfk4['get']['status']
				>(prefix, PATH0, GET, option).json(),
			/**
			 * 経験スキルのマスタの取得
			 * @returns 経験スキルのマスタの取得成功
			 */
			$get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_24gfk4['get']['resBody'],
					BasicHeaders,
					Methods_24gfk4['get']['status']
				>(prefix, PATH0, GET, option)
					.json()
					.then((r) => r.body),
			$path: () => `${prefix}${PATH0}`,
		},
	};
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
