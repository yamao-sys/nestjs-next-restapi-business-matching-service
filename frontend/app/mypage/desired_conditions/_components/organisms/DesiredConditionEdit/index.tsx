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
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { getValidationErrorsByKey } from '@/lib/getValidationErrorsByKey';
import { theme } from '@/styles/theme';
import { useState } from 'react';
import { times } from 'remeda';
import styled from 'styled-components';
import { postUpdateDesiredCondition } from '../../../_server_actions/postUpdateDesiredCondition';
import { BaseLayout } from '@/app/mypage/_components/BaseLayout';
import { LargeHeader } from '@/app/mypage/_components/LargeHeader';

type Props = {
	desiredCondition: DesiredConditionForEditDto;
};

export const DesiredConditionEdit = ({ desiredCondition }: Props) => {
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
		if (!inputDesiredCondition.desiredPriorityConditions) {
			setInputDesiredCondition({
				...inputDesiredCondition,
				desiredPriorityConditions: [{ priority, condition }],
			});
			return;
		}

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
						options={[
							{ value: 'notSeeking', name: '案件を探していない' },
							{ value: 'seeking', name: '案件を探している' },
						]}
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
						options={[
							{ value: 'not_setted', name: '--' },
							{ value: 'immediately', name: '即時' },
							{ value: 'withinMonth', name: '今月中' },
							{ value: 'withinNextMonth', name: '来月中' },
							{ value: 'withinTwoMonths', name: '2ヶ月以内' },
							{ value: 'withinThreeMonths', name: '3ヶ月以内' },
							{ value: 'withinFourMonths', name: '4ヶ月以内' },
							{ value: 'withinFiveMonths', name: '5ヶ月以内' },
							{ value: 'withinSixMonths', name: '6ヶ月以内' },
							{ value: 'anytime', name: 'いつでも' },
						]}
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
						options={[
							{ value: 'not_setted', name: '--' },
							{ value: 'oneDayToAWeek', name: '週1(8時間)' },
							{ value: 'twoDaysToAWeek', name: '週2(16時間)' },
							{ value: 'threeDaysToAWeek', name: '週3(24時間)' },
							{ value: 'fourDaysToAWeek', name: '週4(32時間)' },
							{ value: 'fiveDaysToAWeek', name: '週5(40時間)' },
						]}
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
								minWorkingTimes: e.currentTarget
									.value as DesiredConditionForEditDto['maxWorkingTimes'],
							})
						}
						options={[
							{ value: 'not_setted', name: '--' },
							{ value: 'oneDayToAWeek', name: '週1(8時間)' },
							{ value: 'twoDaysToAWeek', name: '週2(16時間)' },
							{ value: 'threeDaysToAWeek', name: '週3(24時間)' },
							{ value: 'fourDaysToAWeek', name: '週4(32時間)' },
							{ value: 'fiveDaysToAWeek', name: '週5(40時間)' },
						]}
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
						options={[
							{ value: 'not_setted', name: '--' },
							{ value: 'daytimeWorkday', name: '平日日中のみ' },
							{
								value: 'morningNightWorkdayOrHoliday',
								name: '平日朝夜と休日のみ',
							},
							{ value: 'anytime', name: 'いつでも' },
						]}
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
						options={[
							{ value: 'not_setted', name: '--' },
							{
								value: 'noDetailed',
								name: '特になし(リモート・オフラインどちらも可)',
							},
							{
								value: 'office',
								name: 'オフラインメイン',
							},
							{ value: 'partRemort', name: '一部リモート' },
							{ value: 'remortMain', name: 'リモートメイン' },
							{ value: 'fullRemort', name: 'フルリモート' },
						]}
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
							options={[
								{ value: 'not_setted', name: '--' },
								{
									value: 'revenue',
									name: '収入',
								},
								{
									value: 'remort',
									name: 'リモート可',
								},
								{ value: 'working_date', name: '稼働日・時間' },
								{ value: 'industry', name: '分野・業界' },
								{ value: 'skill', name: '活かしたいスキル' },
								{ value: 'experience', name: '活かしたい経験' },
								{
									value: 'want_to_acquire_skill',
									name: '新たに習得したい技術・経験',
								},
								{ value: 'company_scale', name: '企業規模' },
							]}
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
