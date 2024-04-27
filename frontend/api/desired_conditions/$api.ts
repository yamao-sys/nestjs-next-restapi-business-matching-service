import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_12tgfca } from './desiredConditions';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
	const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
	const PATH0 = '/desiredConditions';
	const GET = 'GET';
	const POST = 'POST';

	return {
		desiredConditions: {
			/**
			 * ログインユーザの希望条件を更新
			 * @returns 希望条件の更新成功
			 */
			post: (option: {
				body: Methods_12tgfca['post']['reqBody'];
				config?: T | undefined;
			}) =>
				fetch<
					Methods_12tgfca['post']['resBody'],
					BasicHeaders,
					Methods_12tgfca['post']['status']
				>(prefix, PATH0, POST, option).json(),
			/**
			 * ログインユーザの希望条件を更新
			 * @returns 希望条件の更新成功
			 */
			$post: (option: {
				body: Methods_12tgfca['post']['reqBody'];
				config?: T | undefined;
			}) =>
				fetch<
					Methods_12tgfca['post']['resBody'],
					BasicHeaders,
					Methods_12tgfca['post']['status']
				>(prefix, PATH0, POST, option)
					.json()
					.then((r) => r.body),
			/**
			 * 編集対象となるログインユーザの希望条件を取得
			 * @returns 希望条件の取得成功
			 */
			get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_12tgfca['get']['resBody'],
					BasicHeaders,
					Methods_12tgfca['get']['status']
				>(prefix, PATH0, GET, option).json(),
			/**
			 * 編集対象となるログインユーザの希望条件を取得
			 * @returns 希望条件の取得成功
			 */
			$get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_12tgfca['get']['resBody'],
					BasicHeaders,
					Methods_12tgfca['get']['status']
				>(prefix, PATH0, GET, option)
					.json()
					.then((r) => r.body),
			$path: () => `${prefix}${PATH0}`,
		},
	};
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
