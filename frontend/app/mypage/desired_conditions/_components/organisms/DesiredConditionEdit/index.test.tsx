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

		render(<DesiredConditionEdit desiredCondition={desiredCondition} />);

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

		render(<DesiredConditionEdit desiredCondition={desiredCondition} />);

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

			render(<DesiredConditionEdit desiredCondition={desiredCondition} />);

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
