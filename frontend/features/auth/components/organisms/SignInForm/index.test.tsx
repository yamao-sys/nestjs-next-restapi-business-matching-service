import * as PostSignIn from '@/features/auth/server_actions/postSignIn';
import SignInForm from '.';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../../../server_actions/postSignIn', () => {
	const postSignIn = jest.requireActual('../../../server_actions/postSignIn');
	return {
		__esModule: true,
		...postSignIn,
	};
});
let postSignInSpy: jest.SpyInstance<unknown>;

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

// userのセットアップ
const user = userEvent.setup();

describe('frontend/features/auth/components/organisms/SignInForm', () => {
	beforeEach(() => {
		postSignInSpy = jest
			.spyOn(PostSignIn, 'postSignIn')
			.mockResolvedValue({ errors: [] });
	});

	afterEach(() => {
		postSignInSpy.mockRestore();
	});

	it('<input>タグに値が反映される', async () => {
		render(<SignInForm />);

		const inputEmailElement = screen.getByPlaceholderText(
			'Email',
		) as HTMLInputElement;
		const inputPasswordElement = screen.getByPlaceholderText(
			'Password',
		) as HTMLInputElement;

		await user.type(inputEmailElement, 'test@example.com');
		await user.type(inputPasswordElement, 'password');

		expect(screen.getByPlaceholderText('Email')).toHaveDisplayValue(
			'test@example.com',
		);
		expect(screen.getByPlaceholderText('Password')).toHaveDisplayValue(
			'password',
		);
	});

	describe('バリデーションエラーがない場合', () => {
		beforeEach(() => {
			postSignInSpy = jest
				.spyOn(PostSignIn, 'postSignIn')
				.mockResolvedValue({ errors: [] });
		});

		it('ログインに成功しTOPへ遷移できる', async () => {
			render(<SignInForm />);

			const inputEmailElement = screen.getByPlaceholderText(
				'Email',
			) as HTMLInputElement;
			const inputPasswordElement = screen.getByPlaceholderText(
				'Password',
			) as HTMLInputElement;

			await user.type(inputEmailElement, 'test@example.com');
			await user.type(inputPasswordElement, 'password');

			const submitButtonElement = screen.getByRole('button');
			user.click(submitButtonElement);

			waitFor(() => {
				expect(push).toHaveBeenCalled();
			});
		});
	});

	describe('バリデーションエラーがある場合', () => {
		beforeEach(() => {
			postSignInSpy = jest.spyOn(PostSignIn, 'postSignIn').mockResolvedValue({
				errors: ['メールアドレス、またはパスワードが異なります。'],
			});
		});

		it('確認画面へ遷移せず、パリデーションエラーが表示される', async () => {
			render(<SignInForm />);

			const inputEmailElement = screen.getByPlaceholderText(
				'Email',
			) as HTMLInputElement;
			const inputPasswordElement = screen.getByPlaceholderText(
				'Password',
			) as HTMLInputElement;

			await user.type(inputEmailElement, 'test@example.com');
			await user.type(inputPasswordElement, 'password');

			const submitButtonElement = screen.getByRole('button');
			user.click(submitButtonElement);

			waitFor(() => {
				expect(push).not.toHaveBeenCalled();

				expect(
					screen.getByText('メールアドレス、またはパスワードが異なります。'),
				).toBeInTheDocument();
			});
		});
	});
});
