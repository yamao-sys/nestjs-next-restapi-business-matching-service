import { HTTPError } from '@aspida/fetch';
import { getDesiredConditionsApiClient } from './_server_actions/getDesiredConditionsApiClient';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { DesiredConditionForEditDto } from '@/api/desired_conditions/@types';
import { DesiredConditionEditTemplate } from './_components/templates/DesiredConditionEditTemplate';
import { getDesiredConditionSelectValueApiClient } from './_server_actions/getDesiredConditionSelectValueApiClient';
import { DesiredConditionSelectValues } from '@/api/desired_condition_select_values/@types';

export default async function DesiredConditions() {
	const fetchDesiredCondition = async () => {
		try {
			return await getDesiredConditionsApiClient().desiredConditions.$get();
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.log(error);
			return {} as DesiredConditionForEditDto;
		}
	};
	const fetchDesiredConditionSelectValues = async () => {
		try {
			return await getDesiredConditionSelectValueApiClient().desiredConditionSelectValues.$get();
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.log(error);
			return {} as DesiredConditionSelectValues;
		}
	};
	const desiredCondition = await fetchDesiredCondition();
	const desiredConditionSelectValues =
		await fetchDesiredConditionSelectValues();

	return (
		<>
			<DesiredConditionEditTemplate
				desiredCondition={desiredCondition}
				desiredConditionSelectValues={desiredConditionSelectValues}
			/>
		</>
	);
}
