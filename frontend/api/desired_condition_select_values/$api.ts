import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_p34xij } from './desiredConditionSelectValues';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
	const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
	const PATH0 = '/desiredConditionSelectValues';
	const GET = 'GET';

	return {
		desiredConditionSelectValues: {
			/**
			 * 希望条件編集のセレクトボックスのオプション取得
			 * @returns 希望条件編集のセレクトボックスのオプション取得成功
			 */
			get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_p34xij['get']['resBody'],
					BasicHeaders,
					Methods_p34xij['get']['status']
				>(prefix, PATH0, GET, option).json(),
			/**
			 * 希望条件編集のセレクトボックスのオプション取得
			 * @returns 希望条件編集のセレクトボックスのオプション取得成功
			 */
			$get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_p34xij['get']['resBody'],
					BasicHeaders,
					Methods_p34xij['get']['status']
				>(prefix, PATH0, GET, option)
					.json()
					.then((r) => r.body),
			$path: () => `${prefix}${PATH0}`,
		},
	};
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
