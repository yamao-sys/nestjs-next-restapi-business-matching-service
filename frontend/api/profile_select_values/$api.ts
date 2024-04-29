import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_qrvvrh } from './profileSelectValues';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
	const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
	const PATH0 = '/profileSelectValues';
	const GET = 'GET';

	return {
		profileSelectValues: {
			/**
			 * プロフィール編集のセレクトボックスのオプション取得
			 * @returns プロフィール編集のセレクトボックスのオプション取得成功
			 */
			get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_qrvvrh['get']['resBody'],
					BasicHeaders,
					Methods_qrvvrh['get']['status']
				>(prefix, PATH0, GET, option).json(),
			/**
			 * プロフィール編集のセレクトボックスのオプション取得
			 * @returns プロフィール編集のセレクトボックスのオプション取得成功
			 */
			$get: (option?: { config?: T | undefined } | undefined) =>
				fetch<
					Methods_qrvvrh['get']['resBody'],
					BasicHeaders,
					Methods_qrvvrh['get']['status']
				>(prefix, PATH0, GET, option)
					.json()
					.then((r) => r.body),
			$path: () => `${prefix}${PATH0}`,
		},
	};
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
