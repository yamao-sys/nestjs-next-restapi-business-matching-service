import { getProfileApiClient } from './_server_actions/getProfileApiClient';
import { ProfileEditTemplate } from './_components/templates/ProfileEditTemplate';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { ProfileForEditDto } from '@/api/profiles/@types';
import { getExperiencedEntityMasterApiClient } from './_server_actions/getExperiencedEntityMasterApiClient';
import { FetchExperiencedEntityMasterResponse } from '@/api/experienced_entity_masters/@types';
import { getProfileSelectValueApiClient } from './_server_actions/getProfileSelectValueApiClient';
import { ProfileSelectValues } from '@/api/profile_select_values/@types';

export default async function Profiles() {
	const fetchProfile = async () => {
		try {
			return await getProfileApiClient().profiles.$get();
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.log(error);
			return {} as ProfileForEditDto;
		}
	};
	const fetchProfileSelectValues = async () => {
		try {
			return await getProfileSelectValueApiClient().profileSelectValues.$get();
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.log(error);
			return {} as ProfileSelectValues;
		}
	};
	const fetchExperiencedEntityMaster = async () => {
		try {
			return await getExperiencedEntityMasterApiClient().experiencedEntityMasters.$get();
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.log(error);
			return {} as FetchExperiencedEntityMasterResponse;
		}
	};
	const profile = await fetchProfile();
	const profileSelectValues = await fetchProfileSelectValues();
	const experiencedEntityMasters = await fetchExperiencedEntityMaster();

	return (
		<>
			<ProfileEditTemplate
				profile={profile}
				profileSelectValues={profileSelectValues}
				experiencedEntityMasters={experiencedEntityMasters}
			/>
		</>
	);
}
