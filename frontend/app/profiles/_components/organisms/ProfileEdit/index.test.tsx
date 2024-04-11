import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProfileEdit } from '.';
import userEvent from '@testing-library/user-event';
import * as PostUpdateProfile from '@/app/profiles/_server_actions/postUpdateProfile';

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

describe('frontend/app/profiles/_components/organisms/ProfileEdit', () => {
	it('propsで受け取ったprofileをもとにフォームが初期表示されること', () => {
		const profile = {
			lastName: 'test lastName',
			firstName: 'test firstName',
			birthday: '1992-07-07',
			currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
			inWorkingCompanyName: 'test inWorkingCompanyName',
			tel: '1112222333',
		};
		render(<ProfileEdit profile={profile} />);

		// lastName
		expect(screen.getByDisplayValue(profile.lastName)).toBeInTheDocument();
		// firstName
		expect(screen.getByDisplayValue(profile.firstName)).toBeInTheDocument();
		// birthday
		expect(screen.getByDisplayValue(profile.birthday)).toBeInTheDocument();
		// currentEmployment
		expect(screen.getByRole('combobox')).toHaveValue('fleelance');
		// inWorkingCompanyName
		expect(
			screen.getByDisplayValue(profile.inWorkingCompanyName),
		).toBeInTheDocument();
		// tel
		expect(screen.getByDisplayValue(profile.tel)).toBeInTheDocument();
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
		};
		render(<ProfileEdit profile={profile} />);

		// lastName
		const lastNameInput = screen.getByLabelText('姓', { selector: 'input' });
		expect(lastNameInput).toHaveDisplayValue('test lastName');
		await event.type(lastNameInput, ' edited');
		expect(
			screen.getByLabelText('姓', { selector: 'input' }),
		).toHaveDisplayValue('test lastName edited');

		// firstName
		const firstNameInput = screen.getByLabelText('名', { selector: 'input' });
		expect(firstNameInput).toHaveDisplayValue('test firstName');
		await event.type(firstNameInput, ' edited');
		expect(
			screen.getByLabelText('名', { selector: 'input' }),
		).toHaveDisplayValue('test firstName edited');

		// birthday
		const birthdayInput = screen.getByLabelText('生年月日', {
			selector: 'input',
		});
		expect(birthdayInput).toBeInTheDocument();
		fireEvent.change(birthdayInput, {
			target: { value: '1992-07-08' },
		});
		expect(
			screen.getByLabelText('生年月日', { selector: 'input' }),
		).toHaveDisplayValue('1992-07-08');

		// currentEmployment
		const currentEmploymentInput = screen.getByRole('combobox');
		expect(currentEmploymentInput).toBeInTheDocument();
		await event.selectOptions(currentEmploymentInput, 'fulltime');
		expect(screen.getByRole('combobox')).toHaveValue('fulltime');

		// inWorkingCompanyName
		const inWorkingCompanyNameInput = screen.getByLabelText(
			'稼働中/就業中の会社名',
			{
				selector: 'input',
			},
		);
		expect(inWorkingCompanyNameInput).toHaveDisplayValue(
			'test inWorkingCompanyName',
		);
		await event.type(inWorkingCompanyNameInput, ' edited');
		expect(
			screen.getByLabelText('稼働中/就業中の会社名', {
				selector: 'input',
			}),
		).toHaveDisplayValue('test inWorkingCompanyName edited');

		// tel
		const telInput = screen.getByLabelText('電話番号', {
			selector: 'input',
		});
		expect(telInput).toHaveDisplayValue('1112222333');
		await event.type(telInput, '3');
		expect(
			screen.getByLabelText('電話番号', {
				selector: 'input',
			}),
		).toHaveDisplayValue('11122223333');
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
			};
			render(<ProfileEdit profile={profile} />);

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
			const currentEmploymentInput = screen.getByRole('combobox');
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

			const submitButton = screen.getByRole('button', { name: '保存する' });
			await event.click(submitButton);

			await waitFor(() => {
				expect(postUpdateProfileSpy).toHaveBeenCalled();
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
				};
				render(<ProfileEdit profile={profile} />);

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

		describe('バリデーションエラーなしの場合', () => {
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
						},
						errors: [],
					});
			});

			it('更新成功のメッセージと共に更新内容がフォームに反映されること', async () => {
				const event = userEvent.setup();
				const profile = {
					lastName: '',
					firstName: '',
					birthday: '',
					currentEmployment: 'fleelance' as 'fleelance' | 'fulltime' | 'other',
					inWorkingCompanyName: '',
					tel: '',
				};
				render(<ProfileEdit profile={profile} />);

				// lastName
				const lastNameInput = screen.getByLabelText('姓', {
					selector: 'input',
				});
				await event.type(lastNameInput, 'test lastName edited');

				// firstName
				const firstNameInput = screen.getByLabelText('名', {
					selector: 'input',
				});
				await event.type(firstNameInput, 'test firstName edited');

				// birthday
				const birthdayInput = screen.getByLabelText('生年月日', {
					selector: 'input',
				});
				fireEvent.change(birthdayInput, {
					target: { value: '1992-07-08' },
				});

				// currentEmployment
				const currentEmploymentInput = screen.getByRole('combobox');
				await event.selectOptions(currentEmploymentInput, 'fulltime');

				// inWorkingCompanyName
				const inWorkingCompanyNameInput = screen.getByLabelText(
					'稼働中/就業中の会社名',
					{
						selector: 'input',
					},
				);
				await event.type(
					inWorkingCompanyNameInput,
					'test inWorkingCompanyName edited',
				);

				// tel
				const telInput = screen.getByLabelText('電話番号', {
					selector: 'input',
				});
				await event.type(telInput, '11122223333');

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
	});
});
