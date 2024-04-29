import { ProfileForEditDto } from '@/api/profiles/@types';
import { ProfileEdit } from '../../organisms/ProfileEdit';
import { FetchExperiencedEntityMasterResponse } from '@/api/experienced_entity_masters/@types';
import { ProfileSelectValues } from '@/api/profile_select_values/@types';

type Props = {
	profile: ProfileForEditDto;
	profileSelectValues: ProfileSelectValues;
	experiencedEntityMasters: FetchExperiencedEntityMasterResponse;
};

export const ProfileEditTemplate = ({
	profile,
	profileSelectValues,
	experiencedEntityMasters,
}: Props) => {
	return (
		<>
			<ProfileEdit
				profile={profile}
				profileSelectValues={profileSelectValues}
				experiencedEntityMasters={experiencedEntityMasters}
			/>
		</>
	);
};
