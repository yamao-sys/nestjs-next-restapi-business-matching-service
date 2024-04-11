import { getProfileApiClient } from './_server_actions/getProfileApiClient';
import { ProfileEditTemplate } from './_components/templates/ProfileEditTemplate';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { ProfileForEditDto } from '@/api/profiles/@types';

export default async function Profiles() {
	const fetchProfile = async () => {
		try {
			const client = getProfileApiClient();
			return await client.profiles.$get();
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.error(JSON.stringify(error));
			return {} as ProfileForEditDto;
		}
	};
	const profile = await fetchProfile();

	return (
		<>
			<ProfileEditTemplate profile={profile} />
		</>
	);
}
