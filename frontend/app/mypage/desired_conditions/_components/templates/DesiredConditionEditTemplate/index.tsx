import { DesiredConditionForEditDto } from '@/api/desired_conditions/@types';
import { DesiredConditionEdit } from '../../organisms/DesiredConditionEdit';
import { DesiredConditionSelectValues } from '@/api/desired_condition_select_values/@types';

type Props = {
	desiredCondition: DesiredConditionForEditDto;
	desiredConditionSelectValues: DesiredConditionSelectValues;
};

export const DesiredConditionEditTemplate = ({
	desiredCondition,
	desiredConditionSelectValues,
}: Props) => {
	return (
		<>
			<DesiredConditionEdit
				desiredCondition={desiredCondition}
				desiredConditionSelectValues={desiredConditionSelectValues}
			/>
		</>
	);
};
