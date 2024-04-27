'use server';

import { UpdateDesiredConditionDto } from '@/api/desired_conditions/@types';
import { getDesiredConditionsApiClient } from './getDesiredConditionsApiClient';

export const postUpdateDesiredCondition = async (
	data: UpdateDesiredConditionDto,
) => {
	'use server';

	const client = getDesiredConditionsApiClient();
	const response = await client.desiredConditions.post({
		body: data,
	});

	return {
		desiredCondition: response.body.desiredCondition,
		errors: response.body.errors,
	};
};
