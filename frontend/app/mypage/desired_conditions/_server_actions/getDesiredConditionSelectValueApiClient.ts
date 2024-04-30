import api from '@/api/desired_condition_select_values/$api';
import aspida, { FetchConfig } from '@aspida/fetch';

export const getDesiredConditionSelectValueApiClient = (
	options?: FetchConfig,
) => {
	const baseFetchConditions = {
		baseURL: process.env.BASE_API_URL,
		throwHttpErrors: true,
	};

	return api(aspida(fetch, { ...baseFetchConditions, ...options }));
};
