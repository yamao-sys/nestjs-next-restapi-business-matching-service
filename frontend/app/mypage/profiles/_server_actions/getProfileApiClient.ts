import aspida, { FetchConfig } from '@aspida/fetch';
import { getAllCookies } from '@/lib/getAllCookies';
import api from '@/api/profiles/$api';

export const getProfileApiClient = (options?: FetchConfig) => {
	const baseFetchConditions = {
		baseURL: process.env.BASE_API_URL,
		headers: {
			cookie: getAllCookies(),
		},
		throwHttpErrors: true,
	};

	return api(aspida(fetch, { ...baseFetchConditions, ...options }));
};
