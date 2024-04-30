import api from '@/api/profile_select_values/$api';
import aspida, { FetchConfig } from '@aspida/fetch';

export const getProfileSelectValueApiClient = (options?: FetchConfig) => {
	const baseFetchConditions = {
		baseURL: process.env.BASE_API_URL,
		throwHttpErrors: true,
	};

	return api(aspida(fetch, { ...baseFetchConditions, ...options }));
};
