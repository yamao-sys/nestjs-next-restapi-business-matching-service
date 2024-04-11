'use client';

import { useState } from 'react';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { BaseLayout } from '../BaseLayout';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { postValidateSignUp } from '@/features/auth/server_actions/postValidateSignUp';
import { useSignUpContext } from '@/features/auth/contexts/SignUpContext';
import { useRouter } from 'next/navigation';
import { InputFormArea } from '@/components/molecules/InputFormArea';

export default function SignUpForm() {
	const { inputEmail, setInputEmail, inputPassword, setInputPassword } =
		useSignUpContext();

	const router = useRouter();

	const [emailValidationErrors, setEmailValidationErrors] = useState<String[]>(
		[],
	);
	const [passwordValidationErrors, setPasswordValidationErrors] = useState<
		String[]
	>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);

	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleMoveToConfirm = () => router.push('/sign_up/confirm');

	const handleValidateSignUp = async () => {
		setEmailValidationErrors([]);
		setPasswordValidationErrors([]);

		try {
			const response = await postValidateSignUp({
				email: inputEmail,
				password: inputPassword,
			});

			// バリデーションエラーがなければ、確認画面へ遷移
			if (Object.keys(response.errors).length === 0) {
				handleMoveToConfirm();
				return;
			}

			// NOTE: バリデーションエラーの格納と入力パスワードのリセット
			if (!!response.errors?.email)
				setEmailValidationErrors(response.errors.email);
			if (!!response.errors?.password)
				setPasswordValidationErrors(response.errors.password);
			setInputPassword('');
		} catch (error) {
			if (error instanceof HTTPError) {
				handleApiErrors(error);
			}

			console.error(JSON.stringify(error));
		}
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<BaseLayout title="会員登録" phase="form">
					<InputFormArea
						type="text"
						name="email"
						placeholder="例) test@example.com"
						value={inputEmail}
						onChange={handleChangeInputEmail}
						validationErrors={emailValidationErrors}
					/>
					<InputFormArea
						type="password"
						name="password"
						placeholder="8文字以上20文字以内"
						value={inputPassword}
						onChange={handleChangeInputPassword}
						validationErrors={passwordValidationErrors}
					/>
					<BaseButton title="次へ進む" onClick={handleValidateSignUp} />
				</BaseLayout>
			</ThemeProvider>
		</>
	);
}
