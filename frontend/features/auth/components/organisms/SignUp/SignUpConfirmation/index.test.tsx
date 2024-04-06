import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpConfirmation } from '.';
import * as SignUpContext from '@/features/auth/contexts/SignUpContext';
import * as PostSignUp from '@/features/auth/server_actions/postSignUp';

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

jest.mock('../../../../server_actions/postSignUp', () => {
	const postSignUp = jest.requireActual(
		'../../../../server_actions/postSignUp',
	);
	return {
		__esModule: true,
		...postSignUp,
	};
});
let postSignUpSpy: jest.SpyInstance<unknown>;

// userのセットアップ
const user = userEvent.setup();

describe('features/auth/components/organisms/SignUp/SignUpConfirm', () => {
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

	it('フォームで入力した内容が表示されること', () => {
		render(<SignUpConfirmation />);

		// NOTE: useSignUpContextが実行されることの確認
		expect(signUpContextSpy.mock.calls.length).toEqual(1);

		expect(screen.getByText('test@example.com')).toBeInTheDocument();
		expect(screen.getByText('password')).toBeInTheDocument();
	});

	it('入力画面へ戻れる', () => {
		render(<SignUpConfirmation />);

		const backButton = screen.getByRole('button', { name: '戻る' });
		expect(backButton).toBeInTheDocument;

		user.click(backButton);

		waitFor(() => {
			expect(push).toHaveBeenCalled();
		});
	});

	describe('「登録する」ボタンが押下された時', () => {
		beforeEach(() => {
			postSignUpSpy = jest
				.spyOn(PostSignUp, 'postSignUp')
				.mockResolvedValue({ errors: [] });
		});

		it('サンクス画面へ遷移できる', () => {
			render(<SignUpConfirmation />);

			const submitButton = screen.getByRole('button', { name: '登録する' });
			expect(submitButton).toBeInTheDocument;

			user.click(submitButton);

			waitFor(() => {
				expect(push).toHaveBeenCalled();
			});
		});
	});
});
