import { render, screen } from '@testing-library/react';
import { SignUpThanks } from '.';

describe('features/auth/components/organisms/SignUp/SignUpThanks', () => {
	it('サンクスメッセージが表示されること', () => {
		render(<SignUpThanks />);

		expect(screen.getByText('会員登録が完了しました。')).toBeInTheDocument();
		expect(
			screen.getByText('ご登録いただきありがとうございます。'),
		).toBeInTheDocument();
	});

	it('ログインページへのリンクが表示されること', () => {
		render(<SignUpThanks />);

		expect(screen.getByRole('link', { name: 'ログインページ' }));
	});
});
