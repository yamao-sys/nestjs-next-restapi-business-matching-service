import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_1qj5k18 } from './profiles';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
	const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
	const PATH0 = '/profiles';
	const GET = 'GET';
	const POST = 'POST';

	return {
		profiles: {
			/**
			 * ログインユーザのプロフィールを更新
			 * @returns プロフィールの更新成功
			 */
			post: (option: {
				body: Methods_1qj5k18['post']['reqBody'];
				config?: T | undefined;
			}) =>
				fetch<
					Methods_1qj5k18['post']['resBody'],
					BasicHeaders,
					Methods_1qj5k18['post']['status']
				>(prefix, PATH0, POST, option).json(),
			/**
			 * ログインユーザのプロフィールを更新
			 * @returns プロフィールの更新成功
			 */
			$post: (option: {
				body: Methods_1qj5k18['post']['reqBody'];
				config?: T | undefined;
			}) =>
				fetch<
					Methods_1qj5k18['post']['resBody'],
					BasicHeaders,
					Methods_1qj5k18['post']['status']
				>(prefix, PATH0, POST, option)
					.json()
					.then((r) => r.body),
			/**
			 * 編集対象となるログインユーザのプロフィールを取得
			 * @returns プロフィールの取得成功
			 */
			get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_1qj5k18['get']['resBody'],
					BasicHeaders,
					Methods_1qj5k18['get']['status']
				>(prefix, PATH0, GET, option).json(),
			/**
			 * 編集対象となるログインユーザのプロフィールを取得
			 * @returns プロフィールの取得成功
			 */
			$get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_1qj5k18['get']['resBody'],
					BasicHeaders,
					Methods_1qj5k18['get']['status']
				>(prefix, PATH0, GET, option)
					.json()
					.then((r) => r.body),
			$path: () => `${prefix}${PATH0}`,
		},
	};
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
