'use server';

import { SignUpDto } from '@/api/auth/@types';
import { getApiClient } from '@/lib/Api/client';

export const postValidateSignUp = async (data: SignUpDto) => {
	'use server';

	const client = getApiClient();
	const response = await client.auth.validate_sign_up.post({
		body: { email: data.email, password: data.password },
	});

	return { errors: response.body.errors };
};
