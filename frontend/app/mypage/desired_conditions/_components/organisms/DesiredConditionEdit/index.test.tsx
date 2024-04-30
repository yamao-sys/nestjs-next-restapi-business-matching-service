import { DesiredConditionForEditDto } from '@/api/desired_conditions/@types';
import { render, screen, waitFor } from '@testing-library/react';
import { DesiredConditionEdit } from '.';
import userEvent from '@testing-library/user-event';
import * as PostUpdateDesiredCondition from '@/app/mypage/desired_conditions/_server_actions/postUpdateDesiredCondition';

jest.mock('../../../_server_actions/postUpdateDesiredCondition', () => {
	const postUpdateDesiredCondition = jest.requireActual(
		'../../../_server_actions/postUpdateDesiredCondition',
	);
	return {
		__esModule: true,
		...postUpdateDesiredCondition,
	};
});
let postUpdateDesiredConditionSpy: jest.SpyInstance<unknown>;

const desiredConditionSelectValues = {
	jobSeekingStatus: [
		{ value: 'notSeeking', name: '案件を探していない' },
		{ value: 'seeking', name: '案件を探している' },
	],
	expectedStartTimings: [
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
	],
	workingTimes: [
		{ value: 'not_setted', name: '--' },
		{ value: 'oneDayToAWeek', name: '週1(8時間)' },
		{ value: 'twoDaysToAWeek', name: '週2(16時間)' },
		{ value: 'threeDaysToAWeek', name: '週3(24時間)' },
		{ value: 'fourDaysToAWeek', name: '週4(32時間)' },
		{ value: 'fiveDaysToAWeek', name: '週5(40時間)' },
	],
	workingTimeZone: [
		{ value: 'not_setted', name: '--' },
		{ value: 'daytimeWorkday', name: '平日日中のみ' },
		{
			value: 'morningNightWorkdayOrHoliday',
			name: '平日朝夜と休日のみ',
		},
		{ value: 'anytime', name: 'いつでも' },
	],
	remortWork: [
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
	],
	desiredPriorityCondition: [
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
	],
};

describe('frontend/app/mypage/desired_conditions/_components/organisms/DesiredConditionEdit', () => {
	it('propsで受け取ったprofileをもとにフォームが初期表示されること', () => {
		const desiredCondition = {
			jobSeekingStatus:
				'seeking' as DesiredConditionForEditDto['jobSeekingStatus'],
			expectedStartTimings:
				'not_setted' as DesiredConditionForEditDto['expectedStartTimings'],
			minWorkingTimes:
				'not_setted' as DesiredConditionForEditDto['minWorkingTimes'],
			maxWorkingTimes:
				'not_setted' as DesiredConditionForEditDto['maxWorkingTimes'],
			workingTimeZone:
				'not_setted' as DesiredConditionForEditDto['workingTimeZone'],
			remortWork: 'not_setted' as DesiredConditionForEditDto['remortWork'],
			remarks: 'test_remarks',
			desiredPriorityConditions: [
				{
					priority: 1,
					condition:
						'revenue' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
				},
				{
					priority: 2,
					condition:
						'remort' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
				},
			],
		};

		render(
			<DesiredConditionEdit
				desiredCondition={desiredCondition}
				desiredConditionSelectValues={desiredConditionSelectValues}
			/>,
		);

		// jobSeekingStatus
		expect(
			screen.getByRole('combobox', { name: '案件お探し状況' }),
		).toHaveValue('seeking');

		// expectedStartTimings
		expect(
			screen.getByRole('combobox', { name: 'ご希望の稼働開始時期' }),
		).toHaveValue('not_setted');

		// minWorkingTimes
		expect(
			screen.getByRole('combobox', { name: '稼働時間（最小）' }),
		).toHaveValue('not_setted');

		// maxWorkingTimes
		expect(
			screen.getByRole('combobox', { name: '稼働時間（最大）' }),
		).toHaveValue('not_setted');

		// workingTimeZone
		expect(screen.getByRole('combobox', { name: '稼働時間帯' })).toHaveValue(
			'not_setted',
		);

		// remortWork
		expect(
			screen.getByRole('combobox', { name: 'リモートのご希望' }),
		).toHaveValue('not_setted');

		// desiredPriorityConditions
		expect(
			screen.getByRole('combobox', { name: '優先順位(1番目)' }),
		).toHaveValue('revenue');
		expect(
			screen.getByRole('combobox', { name: '優先順位(2番目)' }),
		).toHaveValue('remort');
		expect(
			screen.getByRole('combobox', { name: '優先順位(3番目)' }),
		).toHaveValue('not_setted');

		// remarks
		expect(
			screen.getByLabelText('その他ご希望', { selector: 'textarea' }),
		).toHaveDisplayValue('test_remarks');
	});

	it('入力がフォームに反映されること', async () => {
		const event = userEvent.setup();
		const desiredCondition = {
			jobSeekingStatus:
				'seeking' as DesiredConditionForEditDto['jobSeekingStatus'],
			expectedStartTimings:
				'not_setted' as DesiredConditionForEditDto['expectedStartTimings'],
			minWorkingTimes:
				'not_setted' as DesiredConditionForEditDto['minWorkingTimes'],
			maxWorkingTimes:
				'not_setted' as DesiredConditionForEditDto['maxWorkingTimes'],
			workingTimeZone:
				'not_setted' as DesiredConditionForEditDto['workingTimeZone'],
			remortWork: 'not_setted' as DesiredConditionForEditDto['remortWork'],
			remarks: 'test_remarks',
			desiredPriorityConditions: [
				{
					priority: 1,
					condition:
						'revenue' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
				},
				{
					priority: 2,
					condition:
						'remort' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
				},
			],
		};

		render(
			<DesiredConditionEdit
				desiredCondition={desiredCondition}
				desiredConditionSelectValues={desiredConditionSelectValues}
			/>,
		);

		// jobSeekingStatus
		const jobSeekingStatusInput = screen.getByRole('combobox', {
			name: '案件お探し状況',
		});
		await event.selectOptions(jobSeekingStatusInput, 'notSeeking');
		expect(
			screen.getByRole('combobox', { name: '案件お探し状況' }),
		).toHaveValue('notSeeking');

		// expectedStartTimings
		const expectedStartTimingsInput = screen.getByRole('combobox', {
			name: 'ご希望の稼働開始時期',
		});
		await event.selectOptions(expectedStartTimingsInput, 'immediately');
		expect(
			screen.getByRole('combobox', { name: 'ご希望の稼働開始時期' }),
		).toHaveValue('immediately');

		// minWorkingTimes
		const minWorkingTimesInput = screen.getByRole('combobox', {
			name: '稼働時間（最小）',
		});
		await event.selectOptions(minWorkingTimesInput, 'oneDayToAWeek');
		expect(
			screen.getByRole('combobox', { name: '稼働時間（最小）' }),
		).toHaveValue('oneDayToAWeek');

		// maxWorkingTimes
		const maxWorkingTimesInput = screen.getByRole('combobox', {
			name: '稼働時間（最大）',
		});
		await event.selectOptions(maxWorkingTimesInput, 'fiveDaysToAWeek');
		expect(
			screen.getByRole('combobox', { name: '稼働時間（最大）' }),
		).toHaveValue('fiveDaysToAWeek');

		// workingTimeZone
		const workingTimeZoneInput = screen.getByRole('combobox', {
			name: '稼働時間帯',
		});
		await event.selectOptions(workingTimeZoneInput, 'daytimeWorkday');
		expect(screen.getByRole('combobox', { name: '稼働時間帯' })).toHaveValue(
			'daytimeWorkday',
		);

		// remortWork
		const remortWorkInput = screen.getByRole('combobox', {
			name: 'リモートのご希望',
		});
		await event.selectOptions(remortWorkInput, 'noDetailed');
		expect(
			screen.getByRole('combobox', { name: 'リモートのご希望' }),
		).toHaveValue('noDetailed');

		// desiredPriorityConditions
		const firstDesiredPriorityConditionInput = screen.getByRole('combobox', {
			name: '優先順位(1番目)',
		});
		await event.selectOptions(
			firstDesiredPriorityConditionInput,
			'working_date',
		);
		expect(
			screen.getByRole('combobox', { name: '優先順位(1番目)' }),
		).toHaveValue('working_date');

		const secondDesiredPriorityConditionInput = screen.getByRole('combobox', {
			name: '優先順位(2番目)',
		});
		await event.selectOptions(secondDesiredPriorityConditionInput, 'industry');
		expect(
			screen.getByRole('combobox', { name: '優先順位(2番目)' }),
		).toHaveValue('industry');

		const thirdDesiredPriorityConditionInput = screen.getByRole('combobox', {
			name: '優先順位(3番目)',
		});
		await event.selectOptions(thirdDesiredPriorityConditionInput, 'skill');
		expect(
			screen.getByRole('combobox', { name: '優先順位(3番目)' }),
		).toHaveValue('skill');

		// remarks
		const remarksInput = screen.getByLabelText('その他ご希望', {
			selector: 'textarea',
		});
		await event.type(remarksInput, '_edited');
		expect(
			screen.getByLabelText('その他ご希望', { selector: 'textarea' }),
		).toHaveDisplayValue('test_remarks_edited');
	});

	describe('フォームの送信', () => {
		beforeEach(() => {
			postUpdateDesiredConditionSpy = jest
				.spyOn(PostUpdateDesiredCondition, 'postUpdateDesiredCondition')
				.mockResolvedValue({
					desiredCondition: {
						jobSeekingStatus:
							'notSeeking' as DesiredConditionForEditDto['jobSeekingStatus'],
						expectedStartTimings:
							'immediately' as DesiredConditionForEditDto['expectedStartTimings'],
						minWorkingTimes:
							'oneDayToAWeek' as DesiredConditionForEditDto['minWorkingTimes'],
						maxWorkingTimes:
							'fiveDaysToAWeek' as DesiredConditionForEditDto['maxWorkingTimes'],
						workingTimeZone:
							'daytimeWorkday' as DesiredConditionForEditDto['workingTimeZone'],
						remortWork:
							'noDetailed' as DesiredConditionForEditDto['remortWork'],
						remarks: 'test_remarks_edited',
						desiredPriorityConditions: [
							{
								priority: 1,
								condition:
									'working_date' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
							},
							{
								priority: 2,
								condition:
									'industry' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
							},
							{
								priority: 3,
								condition:
									'skill' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
							},
						],
					},
					errors: [],
				});
		});

		it('フォームが送信されること', async () => {
			const event = userEvent.setup();
			const desiredCondition = {
				jobSeekingStatus:
					'seeking' as DesiredConditionForEditDto['jobSeekingStatus'],
				expectedStartTimings:
					'not_setted' as DesiredConditionForEditDto['expectedStartTimings'],
				minWorkingTimes:
					'not_setted' as DesiredConditionForEditDto['minWorkingTimes'],
				maxWorkingTimes:
					'not_setted' as DesiredConditionForEditDto['maxWorkingTimes'],
				workingTimeZone:
					'not_setted' as DesiredConditionForEditDto['workingTimeZone'],
				remortWork: 'not_setted' as DesiredConditionForEditDto['remortWork'],
				remarks: 'test_remarks',
				desiredPriorityConditions: [
					{
						priority: 1,
						condition:
							'revenue' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
					},
					{
						priority: 2,
						condition:
							'remort' as DesiredConditionForEditDto['desiredPriorityConditions'][0]['condition'],
					},
				],
			};

			render(
				<DesiredConditionEdit
					desiredCondition={desiredCondition}
					desiredConditionSelectValues={desiredConditionSelectValues}
				/>,
			);

			// jobSeekingStatus
			const jobSeekingStatusInput = screen.getByRole('combobox', {
				name: '案件お探し状況',
			});
			await event.selectOptions(jobSeekingStatusInput, 'notSeeking');

			// expectedStartTimings
			const expectedStartTimingsInput = screen.getByRole('combobox', {
				name: 'ご希望の稼働開始時期',
			});
			await event.selectOptions(expectedStartTimingsInput, 'immediately');

			// minWorkingTimes
			const minWorkingTimesInput = screen.getByRole('combobox', {
				name: '稼働時間（最小）',
			});
			await event.selectOptions(minWorkingTimesInput, 'oneDayToAWeek');

			// maxWorkingTimes
			const maxWorkingTimesInput = screen.getByRole('combobox', {
				name: '稼働時間（最大）',
			});
			await event.selectOptions(maxWorkingTimesInput, 'fiveDaysToAWeek');

			// workingTimeZone
			const workingTimeZoneInput = screen.getByRole('combobox', {
				name: '稼働時間帯',
			});
			await event.selectOptions(workingTimeZoneInput, 'daytimeWorkday');

			// remortWork
			const remortWorkInput = screen.getByRole('combobox', {
				name: 'リモートのご希望',
			});
			await event.selectOptions(remortWorkInput, 'noDetailed');

			// desiredPriorityConditions
			const firstDesiredPriorityConditionInput = screen.getByRole('combobox', {
				name: '優先順位(1番目)',
			});
			await event.selectOptions(
				firstDesiredPriorityConditionInput,
				'working_date',
			);

			const secondDesiredPriorityConditionInput = screen.getByRole('combobox', {
				name: '優先順位(2番目)',
			});
			await event.selectOptions(
				secondDesiredPriorityConditionInput,
				'industry',
			);

			const thirdDesiredPriorityConditionInput = screen.getByRole('combobox', {
				name: '優先順位(3番目)',
			});
			await event.selectOptions(thirdDesiredPriorityConditionInput, 'skill');

			// remarks
			const remarksInput = screen.getByLabelText('その他ご希望', {
				selector: 'textarea',
			});
			await event.type(remarksInput, '_edited');

			// 保存ボタンの押下
			const submitButton = screen.getByRole('button', { name: '保存する' });
			await event.click(submitButton);

			await waitFor(() => {
				expect(postUpdateDesiredConditionSpy).toHaveBeenCalled();
			});
			await waitFor(() => {
				expect(
					screen.getByText('希望条件の更新に成功しました！'),
				).toBeInTheDocument();
			});
		});

		// TODO: バリデーションチェックを実装次第、追加する
		// describe('バリデーションありの場合', () => {
		// 	it('エラーメッセージが表示されること', async () => {});
		// });
	});
});
