'use server';

import { UpdateProfileDto } from '@/api/profiles/@types';
import { getProfileApiClient } from './getProfileApiClient';

export const postUpdateProfile = async (data: UpdateProfileDto) => {
	'use server';

	const client = getProfileApiClient();
	const response = await client.profiles.post({
		body: data,
	});

	return { profile: response.body.profile, errors: response.body.errors };
};
