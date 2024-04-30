'use client';

import {
	DesiredConditionForEditDto,
	UpdateDesiredConditionDto,
	UpdateDesiredConditionResponseDto,
} from '@/api/desired_conditions/@types';
import { BaseBox } from '@/components/atoms/BaseBox';
import { BaseButton } from '@/components/atoms/BaseButton';
import { SelectFormArea } from '@/components/molecules/SelectFormArea';
import { TextFormArea } from '@/components/molecules/TextFormArea';
import { getValidationErrorsByKey } from '@/lib/getValidationErrorsByKey';
import { useState } from 'react';
import { times } from 'remeda';
import { postUpdateDesiredCondition } from '../../../_server_actions/postUpdateDesiredCondition';
import { BaseLayout } from '@/app/mypage/_components/BaseLayout';
import { LargeHeader } from '@/app/mypage/_components/LargeHeader';
import { DesiredConditionSelectValues } from '@/api/desired_condition_select_values/@types';

type Props = {
	desiredCondition: DesiredConditionForEditDto;
	desiredConditionSelectValues: DesiredConditionSelectValues;
};

export const DesiredConditionEdit = ({
	desiredCondition,
	desiredConditionSelectValues,
}: Props) => {
	const PRIORITY_CONDITIONS_SIZE = 3;

	const [inputDesiredCondition, setInputDesiredCondition] =
		useState<DesiredConditionForEditDto>(desiredCondition);
	const [validationErrors, setValidationErrors] = useState<
		UpdateDesiredConditionResponseDto['errors']
	>([]);
	const [successFlashMessage, setSuccessFlashMessage] = useState<string>('');

	const updateInputDesiredCondition = (
		params: Partial<UpdateDesiredConditionDto>,
	) => {
		setInputDesiredCondition({ ...inputDesiredCondition, ...params });
	};

	const updateInputDesiredPriorityCondition = (
		priority: number,
		condition: DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
	) => {
		// NOTE: 希望条件がまだ0件の場合: 新たに入力値として追加
		if (!inputDesiredCondition.desiredPriorityConditions) {
			setInputDesiredCondition({
				...inputDesiredCondition,
				desiredPriorityConditions: [{ priority, condition }],
			});
			return;
		}

		// NOTE: 希望条件は存在するが、指定した優先順位のものはまだ存在しない場合: 新たに入力値として追加
		if (
			!inputDesiredCondition.desiredPriorityConditions.find(
				(dpc) => dpc.priority === priority,
			)
		) {
			setInputDesiredCondition({
				...inputDesiredCondition,
				desiredPriorityConditions: [
					...inputDesiredCondition.desiredPriorityConditions,
					{ priority, condition },
				],
			});
			return;
		}

		// NOTE: 指定した優先順位の希望条件は存在する場合: 該当する優先順位の入力値を更新
		const newDesiredPriorityConditions =
			inputDesiredCondition.desiredPriorityConditions.map((dpc) => {
				if (dpc.priority !== priority) return dpc;

				dpc.condition = condition;
				return dpc;
			});
		setInputDesiredCondition({
			...inputDesiredCondition,
			desiredPriorityConditions: newDesiredPriorityConditions,
		});
	};

	const handleUpdateDesiredCondition = async () => {
		setValidationErrors([]);

		const response = await postUpdateDesiredCondition(inputDesiredCondition);

		// バリデーションエラーがなければ、フラッシュメッセージを表示して編集画面の入力stateを更新
		if (Object.keys(response.errors).length === 0) {
			updateInputDesiredCondition(response.desiredCondition);
			setSuccessFlashMessage('希望条件の更新に成功しました！');
			setTimeout(() => setSuccessFlashMessage(''), 2000);
		}
		setValidationErrors(response.errors);
	};

	return (
		<>
			<BaseLayout>
				{successFlashMessage && <div>{successFlashMessage}</div>}

				<LargeHeader title="希望条件" />

				<BaseBox width="threeQuarters">
					<SelectFormArea
						id="job_seeking_status"
						labelText="案件お探し状況"
						defaultValue={inputDesiredCondition.jobSeekingStatus}
						onChange={(e) =>
							updateInputDesiredCondition({
								jobSeekingStatus: e.currentTarget
									.value as DesiredConditionForEditDto['jobSeekingStatus'],
							})
						}
						options={desiredConditionSelectValues.jobSeekingStatus}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'jobSeekingStatus') ??
							[]
						}
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
					<SelectFormArea
						id="expected_start_timings"
						labelText="ご希望の稼働開始時期"
						defaultValue={inputDesiredCondition.expectedStartTimings}
						onChange={(e) =>
							updateInputDesiredCondition({
								expectedStartTimings: e.currentTarget
									.value as DesiredConditionForEditDto['expectedStartTimings'],
							})
						}
						options={desiredConditionSelectValues.expectedStartTimings}
						validationErrors={
							getValidationErrorsByKey(
								validationErrors,
								'expectedStartTimings',
							) ?? []
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
					<SelectFormArea
						id="min_working_times"
						labelText="稼働時間（最小）"
						defaultValue={inputDesiredCondition.minWorkingTimes}
						onChange={(e) =>
							updateInputDesiredCondition({
								minWorkingTimes: e.currentTarget
									.value as DesiredConditionForEditDto['minWorkingTimes'],
							})
						}
						options={desiredConditionSelectValues.workingTimes}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'minWorkingTimes') ??
							[]
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
					<SelectFormArea
						id="max_working_times"
						labelText="稼働時間（最大）"
						defaultValue={inputDesiredCondition.maxWorkingTimes}
						onChange={(e) =>
							updateInputDesiredCondition({
								maxWorkingTimes: e.currentTarget
									.value as DesiredConditionForEditDto['maxWorkingTimes'],
							})
						}
						options={desiredConditionSelectValues.workingTimes}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'maxWorkingTimes') ??
							[]
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
					<SelectFormArea
						id="working_time_zone"
						labelText="稼働時間帯"
						defaultValue={inputDesiredCondition.workingTimeZone}
						onChange={(e) =>
							updateInputDesiredCondition({
								workingTimeZone: e.currentTarget
									.value as DesiredConditionForEditDto['workingTimeZone'],
							})
						}
						options={desiredConditionSelectValues.workingTimeZone}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'workingTimeZone') ??
							[]
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
					<SelectFormArea
						id="remort_work"
						labelText="リモートのご希望"
						defaultValue={inputDesiredCondition.remortWork}
						onChange={(e) =>
							updateInputDesiredCondition({
								remortWork: e.currentTarget
									.value as DesiredConditionForEditDto['remortWork'],
							})
						}
						options={desiredConditionSelectValues.remortWork}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'remortWork') ?? []
						}
						width="full"
					/>
				</BaseBox>

				{times(PRIORITY_CONDITIONS_SIZE, (index) => (
					<BaseBox key={index} width="threeQuarters">
						<SelectFormArea
							id={`desired_priority_condition_${index + 1}`}
							labelText={`優先順位(${index + 1}番目)`}
							defaultValue={
								inputDesiredCondition.desiredPriorityConditions.find(
									(dpc) => dpc.priority === index + 1,
								)?.condition ?? ''
							}
							onChange={(e) =>
								updateInputDesiredPriorityCondition(
									index + 1,
									e.target
										.value as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
								)
							}
							options={desiredConditionSelectValues.desiredPriorityCondition}
							validationErrors={
								getValidationErrorsByKey(validationErrors, 'remortWork') ?? []
							}
							width="full"
						/>
					</BaseBox>
				))}

				<BaseBox width="threeQuarters">
					<TextFormArea
						id="remarks"
						labelText="その他ご希望"
						placeholder=""
						value={inputDesiredCondition.remarks}
						onChange={(e) =>
							updateInputDesiredCondition({ remarks: e.target.value })
						}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'remarks') ?? []
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="quarter">
					<BaseButton
						title="保存する"
						onClick={handleUpdateDesiredCondition}
						width="full"
					/>
				</BaseBox>
			</BaseLayout>
		</>
	);
};
