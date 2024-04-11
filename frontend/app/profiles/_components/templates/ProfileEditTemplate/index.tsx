import { ProfileForEditDto } from '@/api/profiles/@types';
import { ProfileEdit } from '../../organisms/ProfileEdit';

type Props = {
	profile: ProfileForEditDto;
};

export const ProfileEditTemplate = ({ profile }: Props) => {
	return (
		<>
			<ProfileEdit profile={profile} />
		</>
	);
};
