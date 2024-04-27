import { DesiredConditionForEditDto } from '@/api/desired_conditions/@types';
import { DesiredConditionEdit } from '../../organisms/DesiredConditionEdit';

type Props = {
	desiredCondition: DesiredConditionForEditDto;
};

export const DesiredConditionEditTemplate = ({ desiredCondition }: Props) => {
	return (
		<>
			<DesiredConditionEdit desiredCondition={desiredCondition} />
		</>
	);
};
