import { HTTPError } from '@aspida/fetch';
import { getDesiredConditionsApiClient } from './_server_actions/getDesiredConditionsApiClient';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { DesiredConditionForEditDto } from '@/api/desired_conditions/@types';
import { DesiredConditionEditTemplate } from './_components/templates/DesiredConditionEditTemplate';

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
	const desiredCondition = await fetchDesiredCondition();

	return (
		<>
			<DesiredConditionEditTemplate desiredCondition={desiredCondition} />
		</>
	);
}
