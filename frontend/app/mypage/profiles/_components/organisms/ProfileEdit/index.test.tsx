import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProfileEdit } from '.';
import userEvent from '@testing-library/user-event';
import * as PostUpdateProfile from '@/app/mypage/profiles/_server_actions/postUpdateProfile';

jest.mock('../../../_server_actions/postUpdateProfile', () => {
	const postUpdateProfile = jest.requireActual(
		'../../../_server_actions/postUpdateProfile',
	);
	return {
		__esModule: true,
		...postUpdateProfile,
	};
});
let postUpdateProfileSpy: jest.SpyInstance<unknown>;

const profileSelectValues = {
	currentEmployment: [
		{ value: 'fleelance', name: 'フリーランス' },
		{ value: 'fulltime', name: '正社員' },
		{ value: 'other', name: 'その他' },
	],
	experiencedDuration: [
		{ value: 'lessThanOneYear', name: '〜1年' },
		{ value: 'junior', name: '1〜2年' },
		{ value: 'middle', name: '2〜3年' },
		{ value: 'senior', name: '3〜5年' },
		{ value: 'expert', name: '10年〜' },
	],
	experiencedEntityDuration: [
		{ value: 'lessThanOneYear', name: '〜1年' },
		{ value: 'junior', name: '1〜2年' },
		{ value: 'middle', name: '2〜3年' },
		{ value: 'senior', name: '3〜5年' },
		{ value: 'expert', name: '10年〜' },
	],
};

describe('frontend/app/mypage/profiles/_components/organisms/ProfileEdit', () => {
	it('propsで受け取ったprofileをもとにフォームが初期表示されること', () => {
		const profile = {
			lastName: 'test lastName',
			firstName: 'test firstName',
			birthday: '1992-07-07',
			currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
			inWorkingCompanyName: 'test inWorkingCompanyName',
			tel: '1112222333',
			latestProject: 'test latestProject',
			currentHourlyWage: 5000,
			experiencedDuration: 'expert' as
				| 'expert'
				| 'lessThanOneYear'
				| 'junior'
				| 'middle'
				| 'senior',
			experiencedProfessions: [
				{
					professionId: '1',
					experiencedDuration: 'expert' as
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior'
						| 'expert',
				},
			],
			experiencedProgrammingLanguages: [
				{
					programmingLanguageId: '1',
					experiencedDuration: 'expert' as
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior'
						| 'expert',
				},
			],
			selfPromotion: 'test selfPromotion',
		};

		const experiencedEntityMasters = {
			professions: [
				{ id: '1', name: 'testProfession1' },
				{ id: '2', name: 'testProfession2' },
			],
			programmingLanguages: [
				{ id: '1', name: 'testProgrammingLanguage1' },
				{ id: '2', name: 'testProgrammingLanguage2' },
			],
		};
		render(
			<ProfileEdit
				profile={profile}
				profileSelectValues={profileSelectValues}
				experiencedEntityMasters={experiencedEntityMasters}
			/>,
		);

		// lastName
		expect(screen.getByDisplayValue(profile.lastName)).toBeInTheDocument();

		// firstName
		expect(screen.getByDisplayValue(profile.firstName)).toBeInTheDocument();

		// birthday
		expect(screen.getByDisplayValue(profile.birthday)).toBeInTheDocument();

		// currentEmployment
		expect(
			screen.getByRole('combobox', { name: '現在の雇用形態' }),
		).toHaveValue('fleelance');

		// inWorkingCompanyName
		expect(
			screen.getByDisplayValue(profile.inWorkingCompanyName),
		).toBeInTheDocument();

		// tel
		expect(screen.getByDisplayValue(profile.tel)).toBeInTheDocument();

		// latestProject
		expect(screen.getByDisplayValue(profile.latestProject)).toBeInTheDocument();

		// currentHourlyWage
		expect(
			screen.getByRole('combobox', { name: 'エンジニア実務経験' }),
		).toHaveValue('expert');

		// experiencedProfessions
		expect(
			screen.getByRole('checkbox', { name: 'testProfession1' }),
		).toHaveAttribute('aria-checked', 'true');
		expect(
			screen.queryByRole('combobox', { name: 'testProfession1' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('checkbox', { name: 'testProfession2' }),
		).toHaveAttribute('aria-checked', 'false');
		expect(
			screen.queryByRole('combobox', { name: 'testProfession2' }),
		).not.toBeInTheDocument();

		// experiencedProgrammingLanguages
		expect(
			screen.getByRole('checkbox', { name: 'testProgrammingLanguage1' }),
		).toHaveAttribute('aria-checked', 'true');
		expect(
			screen.queryByRole('combobox', { name: 'testProgrammingLanguage1' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('checkbox', { name: 'testProgrammingLanguage2' }),
		).toHaveAttribute('aria-checked', 'false');
		expect(
			screen.queryByRole('combobox', { name: 'testProgrammingLanguage2' }),
		).not.toBeInTheDocument();

		// selfPromotion
		expect(screen.getByDisplayValue(profile.selfPromotion)).toBeInTheDocument();
	});

	describe('編集対象のプロフィールにスキルシート関連のデータがあるとき', () => {
		it('スキルシートのダウンロードリンクが表示されること', async () => {
			const profile = {
				lastName: 'test lastName',
				firstName: 'test firstName',
				birthday: '1992-07-07',
				currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
				inWorkingCompanyName: 'test inWorkingCompanyName',
				tel: '1112222333',
				latestProject: 'test latestProject',
				currentHourlyWage: 5000,
				experiencedDuration: 'expert' as
					| 'expert'
					| 'lessThanOneYear'
					| 'junior'
					| 'middle'
					| 'senior',
				experiencedProfessions: [
					{
						professionId: '1',
						experiencedDuration: 'expert' as
							| 'lessThanOneYear'
							| 'junior'
							| 'middle'
							| 'senior'
							| 'expert',
					},
				],
				experiencedProgrammingLanguages: [
					{
						programmingLanguageId: '1',
						experiencedDuration: 'expert' as
							| 'lessThanOneYear'
							| 'junior'
							| 'middle'
							| 'senior'
							| 'expert',
					},
				],
				selfPromotion: 'test selfPromotion',
				skillsheetName: 'test_skillsheet_name.txt',
				skillsheetData: 'test_skillsheet_content',
			};

			const experiencedEntityMasters = {
				professions: [
					{ id: '1', name: 'testProfession1' },
					{ id: '2', name: 'testProfession2' },
				],
				programmingLanguages: [
					{ id: '1', name: 'testProgrammingLanguage1' },
					{ id: '2', name: 'testProgrammingLanguage2' },
				],
			};
			render(
				<ProfileEdit
					profile={profile}
					profileSelectValues={profileSelectValues}
					experiencedEntityMasters={experiencedEntityMasters}
				/>,
			);

			expect(
				screen.getByRole('link', { name: 'test_skillsheet_name.txt' }),
			).toBeInTheDocument();
		});
	});

	it('入力がフォームに反映されること', async () => {
		const event = userEvent.setup();
		const profile = {
			lastName: 'test lastName',
			firstName: 'test firstName',
			birthday: '1992-07-07',
			currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
			inWorkingCompanyName: 'test inWorkingCompanyName',
			tel: '1112222333',
			latestProject: 'test latestProject',
			currentHourlyWage: 5000,
			experiencedDuration: 'expert' as
				| 'expert'
				| 'lessThanOneYear'
				| 'junior'
				| 'middle'
				| 'senior',
			experiencedProfessions: [
				{
					professionId: '1',
					experiencedDuration: 'expert' as
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior'
						| 'expert',
				},
			],
			experiencedProgrammingLanguages: [
				{
					programmingLanguageId: '1',
					experiencedDuration: 'expert' as
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior'
						| 'expert',
				},
			],
			selfPromotion: 'test selfPromotion',
		};

		const experiencedEntityMasters = {
			professions: [
				{ id: '1', name: 'testProfession1' },
				{ id: '2', name: 'testProfession2' },
			],
			programmingLanguages: [
				{ id: '1', name: 'testProgrammingLanguage1' },
				{ id: '2', name: 'testProgrammingLanguage2' },
			],
		};
		render(
			<ProfileEdit
				profile={profile}
				profileSelectValues={profileSelectValues}
				experiencedEntityMasters={experiencedEntityMasters}
			/>,
		);

		// lastName
		const lastNameInput = screen.getByLabelText('姓', { selector: 'input' });
		await event.type(lastNameInput, ' edited');
		expect(
			screen.getByLabelText('姓', { selector: 'input' }),
		).toHaveDisplayValue(`${profile.lastName} edited`);

		// firstName
		const firstNameInput = screen.getByLabelText('名', { selector: 'input' });
		await event.type(firstNameInput, ' edited');
		expect(
			screen.getByLabelText('名', { selector: 'input' }),
		).toHaveDisplayValue(`${profile.firstName} edited`);

		// birthday
		const birthdayInput = screen.getByLabelText('生年月日', {
			selector: 'input',
		});
		fireEvent.change(birthdayInput, {
			target: { value: '1992-07-08' },
		});
		expect(
			screen.getByLabelText('生年月日', { selector: 'input' }),
		).toHaveDisplayValue('1992-07-08');

		// currentEmployment
		const currentEmploymentInput = screen.getByRole('combobox', {
			name: '現在の雇用形態',
		});
		await event.selectOptions(currentEmploymentInput, 'fulltime');
		expect(
			screen.getByRole('combobox', { name: '現在の雇用形態' }),
		).toHaveValue('fulltime');

		// inWorkingCompanyName
		const inWorkingCompanyNameInput = screen.getByLabelText(
			'稼働中/就業中の会社名',
			{
				selector: 'input',
			},
		);
		await event.type(inWorkingCompanyNameInput, ' edited');
		expect(
			screen.getByLabelText('稼働中/就業中の会社名', {
				selector: 'input',
			}),
		).toHaveDisplayValue(`${profile.inWorkingCompanyName} edited`);

		// tel
		const telInput = screen.getByLabelText('電話番号', {
			selector: 'input',
		});
		await event.type(telInput, '3');
		expect(
			screen.getByLabelText('電話番号', {
				selector: 'input',
			}),
		).toHaveDisplayValue(`${profile.tel}3`);

		// latestProject
		const latestProjectInput = screen.getByLabelText('直近の開発実績', {
			selector: 'input',
		});
		await event.type(latestProjectInput, ' edited');
		expect(
			screen.getByLabelText('直近の開発実績', { selector: 'input' }),
		).toHaveDisplayValue(`${profile.latestProject} edited`);

		// currentHourlyWage
		const currentHourlyWageInput = screen.getByLabelText('現時間単価', {
			selector: 'input',
		});
		await event.type(currentHourlyWageInput, '0');
		expect(
			screen.getByLabelText('現時間単価', { selector: 'input' }),
		).toHaveDisplayValue(`${profile.currentHourlyWage}0`);

		// experiencedDuration
		const experiencedDurationSelect = screen.getByRole('combobox', {
			name: 'エンジニア実務経験',
		});
		await event.selectOptions(experiencedDurationSelect, 'senior');
		expect(
			screen.getByRole('combobox', { name: 'エンジニア実務経験' }),
		).toHaveValue('senior');

		// experiencedProfessions
		const experiencedProfession1 = screen.getByRole('checkbox', {
			name: 'testProfession1',
		});
		await event.click(experiencedProfession1);
		expect(
			screen.getByRole('checkbox', { name: 'testProfession1' }),
		).toHaveAttribute('aria-checked', 'false');
		expect(
			screen.queryByRole('combobox', { name: 'testProfession1' }),
		).not.toBeInTheDocument();

		const experiencedProfession2 = screen.getByRole('checkbox', {
			name: 'testProfession2',
		});
		await event.click(experiencedProfession2);
		expect(
			screen.getByRole('checkbox', { name: 'testProfession2' }),
		).toHaveAttribute('aria-checked', 'true');
		expect(
			screen.queryByRole('combobox', { name: 'testProfession2' }),
		).toBeInTheDocument();

		// experiencedProgrammingLanguages
		const experiencedProgrammingLanguage1 = screen.getByRole('checkbox', {
			name: 'testProgrammingLanguage1',
		});
		await event.click(experiencedProgrammingLanguage1);
		expect(
			screen.getByRole('checkbox', { name: 'testProgrammingLanguage1' }),
		).toHaveAttribute('aria-checked', 'false');
		expect(
			screen.queryByRole('combobox', { name: 'testProgrammingLanguage1' }),
		).not.toBeInTheDocument();

		const experiencedProgrammingLanguage2 = screen.getByRole('checkbox', {
			name: 'testProgrammingLanguage2',
		});
		await event.click(experiencedProgrammingLanguage2);
		expect(
			screen.getByRole('checkbox', { name: 'testProgrammingLanguage2' }),
		).toHaveAttribute('aria-checked', 'true');
		expect(
			screen.queryByRole('combobox', { name: 'testProgrammingLanguage2' }),
		).toBeInTheDocument();

		// selfPromotion
		const selfPromotionInput = screen.getByLabelText('自己PR', {
			selector: 'textarea',
		});
		await event.type(selfPromotionInput, ' edited');
		expect(
			screen.getByLabelText('自己PR', { selector: 'textarea' }),
		).toHaveDisplayValue(`${profile.selfPromotion} edited`);

		// skillsheet
		const file = new File(['a', 'b', 'c'], 'test.csv', { type: 'text/csv' });
		event.upload(screen.getByLabelText('スキルシート'), file);
		await waitFor(() =>
			expect(screen.getByLabelText('スキルシート')).toHaveValue(
				'C:\\fakepath\\test.csv',
			),
		);
	});

	describe('フォームの送信', () => {
		beforeEach(() => {
			postUpdateProfileSpy = jest
				.spyOn(PostUpdateProfile, 'postUpdateProfile')
				.mockResolvedValue({
					profile: {
						lastName: 'test lastName edited',
						firstName: 'test firstName edited',
						birthday: '1992-07-08',
						currentEmployment: 'fulltime',
						inWorkingCompanyName: 'test inWorkingCompanyName edited',
						tel: '11122223333',
						latestProject: 'test latestProject',
						currentHourlyWage: 50000,
						experiencedDuration: 'senior' as
							| 'expert'
							| 'lessThanOneYear'
							| 'junior'
							| 'middle'
							| 'senior',
						experiencedProfessions: [
							{
								professionId: '2',
								experiencedDuration: 'senior' as
									| 'lessThanOneYear'
									| 'junior'
									| 'middle'
									| 'senior'
									| 'expert',
							},
						],
						experiencedProgrammingLanguages: [
							{
								programmingLanguageId: '2',
								experiencedDuration: 'senior' as
									| 'lessThanOneYear'
									| 'junior'
									| 'middle'
									| 'senior'
									| 'expert',
							},
						],
						selfPromotion: 'test selfPromotion edited',
					},
					errors: [],
				});
		});

		afterEach(() => {
			postUpdateProfileSpy.mockRestore();
		});

		it('フォームが送信されること', async () => {
			const event = userEvent.setup();
			const profile = {
				lastName: 'test lastName',
				firstName: 'test firstName',
				birthday: '1992-07-07',
				currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
				inWorkingCompanyName: 'test inWorkingCompanyName',
				tel: '1112222333',
				latestProject: 'test latestProject',
				currentHourlyWage: 5000,
				experiencedDuration: 'expert' as
					| 'expert'
					| 'lessThanOneYear'
					| 'junior'
					| 'middle'
					| 'senior',
				experiencedProfessions: [
					{
						professionId: '1',
						experiencedDuration: 'expert' as
							| 'lessThanOneYear'
							| 'junior'
							| 'middle'
							| 'senior'
							| 'expert',
					},
				],
				experiencedProgrammingLanguages: [
					{
						programmingLanguageId: '1',
						experiencedDuration: 'expert' as
							| 'lessThanOneYear'
							| 'junior'
							| 'middle'
							| 'senior'
							| 'expert',
					},
				],
				selfPromotion: 'test selfPromotion',
			};
			const experiencedEntityMasters = {
				professions: [
					{ id: '1', name: 'testProfession1' },
					{ id: '2', name: 'testProfession2' },
				],
				programmingLanguages: [
					{ id: '1', name: 'testProgrammingLanguage1' },
					{ id: '2', name: 'testProgrammingLanguage2' },
				],
			};
			render(
				<ProfileEdit
					profile={profile}
					profileSelectValues={profileSelectValues}
					experiencedEntityMasters={experiencedEntityMasters}
				/>,
			);

			// lastName
			const lastNameInput = screen.getByLabelText('姓', { selector: 'input' });
			await event.type(lastNameInput, ' edited');

			// firstName
			const firstNameInput = screen.getByLabelText('名', { selector: 'input' });
			await event.type(firstNameInput, ' edited');

			// birthday
			const birthdayInput = screen.getByLabelText('生年月日', {
				selector: 'input',
			});
			fireEvent.change(birthdayInput, {
				target: { value: '1992-07-08' },
			});

			// currentEmployment
			const currentEmploymentInput = screen.getByRole('combobox', {
				name: '現在の雇用形態',
			});
			await event.selectOptions(currentEmploymentInput, 'fulltime');

			// inWorkingCompanyName
			const inWorkingCompanyNameInput = screen.getByLabelText(
				'稼働中/就業中の会社名',
				{ selector: 'input' },
			);
			await event.type(inWorkingCompanyNameInput, ' edited');

			// tel
			const telInput = screen.getByLabelText('電話番号', { selector: 'input' });
			await event.type(telInput, '3');

			// latestProject
			const latestProjectInput = screen.getByLabelText('直近の開発実績', {
				selector: 'input',
			});
			await event.type(latestProjectInput, ' edited');

			// currentHourlyWage
			const currentHourlyWageInput = screen.getByLabelText('現時間単価', {
				selector: 'input',
			});
			await event.type(currentHourlyWageInput, '0');

			// experiencedDuration
			const experiencedDurationSelect = screen.getByRole('combobox', {
				name: 'エンジニア実務経験',
			});
			await event.selectOptions(experiencedDurationSelect, 'senior');

			// experiencedProfessions
			const experiencedProfession1 = screen.getByRole('checkbox', {
				name: 'testProfession1',
			});
			await event.click(experiencedProfession1);

			const experiencedProfession2 = screen.getByRole('checkbox', {
				name: 'testProfession2',
			});
			await event.click(experiencedProfession2);

			// experiencedProgrammingLanguages
			const experiencedProgrammingLanguage1 = screen.getByRole('checkbox', {
				name: 'testProgrammingLanguage1',
			});
			await event.click(experiencedProgrammingLanguage1);

			const experiencedProgrammingLanguage2 = screen.getByRole('checkbox', {
				name: 'testProgrammingLanguage2',
			});
			await event.click(experiencedProgrammingLanguage2);

			// selfPromotion
			const selfPromotionInput = screen.getByLabelText('自己PR', {
				selector: 'textarea',
			});
			await event.type(selfPromotionInput, ' edited');

			const submitButton = screen.getByRole('button', { name: '保存する' });
			await event.click(submitButton);

			await waitFor(() => {
				expect(postUpdateProfileSpy).toHaveBeenCalled();
			});
			await waitFor(() => {
				expect(
					screen.getByText('プロフィールの更新に成功しました！'),
				).toBeInTheDocument();
			});
		});

		describe('スキルシートの入力がある場合', () => {
			beforeEach(() => {
				postUpdateProfileSpy = jest
					.spyOn(PostUpdateProfile, 'postUpdateProfile')
					.mockResolvedValue({
						profile: {
							lastName: 'test lastName',
							firstName: 'test firstName',
							birthday: '1992-07-08',
							currentEmployment: 'fulltime',
							inWorkingCompanyName: 'test inWorkingCompanyName',
							tel: '11122223333',
							latestProject: 'test latestProject',
							currentHourlyWage: 50000,
							experiencedDuration: 'senior' as
								| 'expert'
								| 'lessThanOneYear'
								| 'junior'
								| 'middle'
								| 'senior',
							experiencedProfessions: [
								{
									professionId: '2',
									experiencedDuration: 'senior' as
										| 'lessThanOneYear'
										| 'junior'
										| 'middle'
										| 'senior'
										| 'expert',
								},
							],
							experiencedProgrammingLanguages: [
								{
									programmingLanguageId: '2',
									experiencedDuration: 'senior' as
										| 'lessThanOneYear'
										| 'junior'
										| 'middle'
										| 'senior'
										| 'expert',
								},
							],
							selfPromotion: 'test selfPromotion',
							skillsheetName: 'test.csv',
							skillsheetData: 'a,b,c',
						},
						errors: [],
					});
			});

			it('フォームが送信されること', async () => {
				const event = userEvent.setup();
				const profile = {
					lastName: 'test lastName',
					firstName: 'test firstName',
					birthday: '1992-07-07',
					currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
					inWorkingCompanyName: 'test inWorkingCompanyName',
					tel: '1112222333',
					latestProject: 'test latestProject',
					currentHourlyWage: 5000,
					experiencedDuration: 'expert' as
						| 'expert'
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior',
					experiencedProfessions: [
						{
							professionId: '1',
							experiencedDuration: 'expert' as
								| 'lessThanOneYear'
								| 'junior'
								| 'middle'
								| 'senior'
								| 'expert',
						},
					],
					experiencedProgrammingLanguages: [
						{
							programmingLanguageId: '1',
							experiencedDuration: 'expert' as
								| 'lessThanOneYear'
								| 'junior'
								| 'middle'
								| 'senior'
								| 'expert',
						},
					],
					selfPromotion: 'test selfPromotion',
				};

				const experiencedEntityMasters = {
					professions: [
						{ id: '1', name: 'testProfession1' },
						{ id: '2', name: 'testProfession2' },
					],
					programmingLanguages: [
						{ id: '1', name: 'testProgrammingLanguage1' },
						{ id: '2', name: 'testProgrammingLanguage2' },
					],
				};
				render(
					<ProfileEdit
						profile={profile}
						profileSelectValues={profileSelectValues}
						experiencedEntityMasters={experiencedEntityMasters}
					/>,
				);

				// skillsheet
				const file = new File(['a', 'b', 'c'], 'test.csv', {
					type: 'text/csv',
				});
				event.upload(screen.getByLabelText('スキルシート'), file);
				await waitFor(() =>
					expect(screen.getByLabelText('スキルシート')).toHaveValue(
						'C:\\fakepath\\test.csv',
					),
				);

				const submitButton = screen.getByRole('button', { name: '保存する' });
				await event.click(submitButton);

				await waitFor(() => {
					expect(postUpdateProfileSpy).toHaveBeenCalled();
				});
				await waitFor(() => {
					expect(
						screen.getByText('プロフィールの更新に成功しました！'),
					).toBeInTheDocument();
				});
			});
		});

		describe('バリデーションありの場合', () => {
			beforeEach(() => {
				postUpdateProfileSpy = jest
					.spyOn(PostUpdateProfile, 'postUpdateProfile')
					.mockResolvedValue({
						profile: {
							lastName: '',
							firstName: '',
							birthday: '',
							currentEmployment: 'fulltime',
							inWorkingCompanyName: '',
							tel: '',
							latestProject: '',
							currentHourlyWage: 0,
							experiencedDuration: 'expert',
							experiencedProfessions: [],
							experiencedProgrammingLanguages: [],
							selfPromotion: '',
						},
						errors: [
							{
								key: 'lastName',
								messages: ['姓は必須です。'],
							},
							{
								key: 'firstName',
								messages: ['名は必須です。'],
							},
							{
								key: 'birthday',
								messages: ['生年月は必須です。'],
							},
							{
								key: 'inWorkingCompanyName',
								messages: ['稼働中/勤務中の会社は必須です。'],
							},
							{
								key: 'tel',
								messages: [
									'電話番号は0001111222の形式で入力をお願いします。',
									'電話番号は必須です。',
								],
							},
						],
					});
			});

			it('エラーメッセージが表示されること', async () => {
				const event = userEvent.setup();
				const profile = {
					lastName: '',
					firstName: '',
					birthday: '',
					currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
					inWorkingCompanyName: '',
					tel: '',
					latestProject: '',
					currentHourlyWage: 0,
					experiencedDuration: 'expert' as
						| 'expert'
						| 'lessThanOneYear'
						| 'junior'
						| 'middle'
						| 'senior',
					experiencedProfessions: [],
					experiencedProgrammingLanguages: [],
					selfPromotion: '',
				};

				const experiencedEntityMasters = {
					professions: [
						{ id: '1', name: 'testProfession1' },
						{ id: '2', name: 'testProfession2' },
					],
					programmingLanguages: [
						{ id: '1', name: 'testProgrammingLanguage1' },
						{ id: '2', name: 'testProgrammingLanguage2' },
					],
				};
				render(
					<ProfileEdit
						profile={profile}
						profileSelectValues={profileSelectValues}
						experiencedEntityMasters={experiencedEntityMasters}
					/>,
				);

				const submitButton = screen.getByRole('button', { name: '保存する' });
				await event.click(submitButton);

				await waitFor(() => {
					expect(postUpdateProfileSpy).toHaveBeenCalled();
				});
				await waitFor(() => {
					expect(screen.getByText('姓は必須です。')).toBeInTheDocument();
					expect(screen.getByText('名は必須です。')).toBeInTheDocument();
					expect(screen.getByText('生年月は必須です。')).toBeInTheDocument();
					expect(
						screen.getByText('稼働中/勤務中の会社は必須です。'),
					).toBeInTheDocument();
					expect(
						screen.getByText(
							'電話番号は0001111222の形式で入力をお願いします。',
						),
					).toBeInTheDocument();
					expect(screen.getByText('電話番号は必須です。')).toBeInTheDocument();
				});
			});
		});
	});
});
