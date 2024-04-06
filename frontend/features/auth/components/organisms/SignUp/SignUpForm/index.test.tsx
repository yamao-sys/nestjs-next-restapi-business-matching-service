import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUpForm from '.';
import * as SignUpContext from '@/features/auth/contexts/SignUpContext';
import * as PostValidateSignUp from '@/features/auth/server_actions/postValidateSignUp';

jest.mock('../../../../server_actions/postValidateSignUp', () => {
	const postValidateSignUp = jest.requireActual(
		'../../../../server_actions/postValidateSignUp',
	);
	return {
		__esModule: true,
		...postValidateSignUp,
	};
});
let postValidateSignUpSpy: jest.SpyInstance<unknown>;

jest.mock('../../../../contexts/SignUpContext', () => {
	const signUpContext = jest.requireActual(
		'../../../../contexts/SignUpContext',
	);
	return {
		__esModule: true,
		...signUpContext,
	};
});
let signUpContextSpy: jest.SpyInstance<unknown>;

const push = jest.fn();
jest.mock('next/navigation', () => {
	const router = jest.requireActual('next/navigation');
	return {
		...router,
		useRouter: () => {
			return {
				push,
			};
		},
	};
});

describe('features/auth/components/organisms/SignUp/SignUpForm', () => {
	beforeEach(() => {
		signUpContextSpy = jest
			.spyOn(SignUpContext, 'useSignUpContext')
			.mockReturnValue({
				inputEmail: 'test@example.com',
				setInputEmail: jest.fn(),
				inputPassword: 'password',
				setInputPassword: jest.fn(),
			});
	});

	afterEach(() => {
		signUpContextSpy.mockRestore();
	});

	it('<input>タグに値が反映される', () => {
		render(<SignUpForm />);

		// NOTE: useSignUpContextが実行されることの確認
		expect(signUpContextSpy.mock.calls.length).toEqual(1);

		const inputEmailElement = screen.getByPlaceholderText(
			'例) test@example.com',
		) as HTMLInputElement;
		const inputPasswordElement = screen.getByPlaceholderText(
			'8文字以上20文字以内',
		) as HTMLInputElement;

		expect(inputEmailElement.value).toEqual('test@example.com');
		expect(inputPasswordElement.value).toEqual('password');
	});

	describe('バリデーションエラーがない場合', () => {
		beforeEach(() => {
			postValidateSignUpSpy = jest
				.spyOn(PostValidateSignUp, 'postValidateSignUp')
				.mockResolvedValue({ errors: {} });
		});

		it('確認画面へ遷移できる', () => {
			render(<SignUpForm />);

			const submitButtonElement = screen.getByRole('button');
			fireEvent.click(submitButtonElement);

			waitFor(() => {
				expect(push).toHaveBeenCalled();
			});
		});
	});

	describe('バリデーションエラーがある場合', () => {
		beforeEach(() => {
			signUpContextSpy = jest
				.spyOn(SignUpContext, 'useSignUpContext')
				.mockReturnValue({
					inputEmail: '',
					setInputEmail: jest.fn(),
					inputPassword: '',
					setInputPassword: jest.fn(),
				});
			postValidateSignUpSpy = jest
				.spyOn(PostValidateSignUp, 'postValidateSignUp')
				.mockResolvedValue({
					errors: {
						email: ['メールアドレスは必須です。'],
						password: ['パスワードは必須です。'],
					},
				});
		});

		it('確認画面へ遷移せず、パリデーションエラーが表示される', () => {
			render(<SignUpForm />);

			const submitButtonElement = screen.getByRole('button');
			fireEvent.click(submitButtonElement);

			waitFor(() => {
				expect(push).not.toHaveBeenCalled();

				expect(
					screen.getByText('メールアドレスは必須です。'),
				).toBeInTheDocument();
				expect(screen.getByText('パスワードは必須です。')).toBeInTheDocument();
			});
		});
	});
});
