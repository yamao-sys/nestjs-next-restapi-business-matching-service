import aspida, { FetchConfig } from '@aspida/fetch';
import api from '@/api/experienced_entity_masters/$api';

export const getExperiencedEntityMasterApiClient = (options?: FetchConfig) => {
	const baseFetchConditions = {
		baseURL: process.env.BASE_API_URL,
		throwHttpErrors: true,
	};

	return api(aspida(fetch, { ...baseFetchConditions, ...options }));
};
