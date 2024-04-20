import { ProfileForEditDto } from '@/api/profiles/@types';
import { ProfileEdit } from '../../organisms/ProfileEdit';
import { FetchExperiencedEntityMasterResponse } from '@/api/experienced_entity_masters/@types';

type Props = {
	profile: ProfileForEditDto;
	experiencedEntityMasters: FetchExperiencedEntityMasterResponse;
};

export const ProfileEditTemplate = ({
	profile,
	experiencedEntityMasters,
}: Props) => {
	return (
		<>
			<ProfileEdit
				profile={profile}
				experiencedEntityMasters={experiencedEntityMasters}
			/>
		</>
	);
};
