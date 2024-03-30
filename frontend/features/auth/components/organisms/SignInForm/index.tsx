'use client';

import { postSignIn } from '@/features/auth/server_actions/postSignIn';
import { redirectToTopPage } from '@/features/todos/server_actions/redirectToTopPage';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { HTTPError } from '@aspida/fetch';
import { useState } from 'react';
import { BaseLayout } from '../BaseLayout';
import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { InputForm } from '@/components/molecules/InputForm';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

export default function SignInForm() {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);
	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleSignIn = async () => {
		try {
			const response = await postSignIn({
				email: inputEmail,
				password: inputPassword,
			});

			if (!!response?.errors?.length) {
				setValidationErrors(response.errors);
				setInputPassword('');
			} else {
				window.alert('ログインに成功しました！');
				setInputEmail('');
				setInputPassword('');
				await redirectToTopPage();
			}
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
				<BaseLayout title="ログイン">
					{!!validationErrors.length && (
						<ValidationErrorBox messages={validationErrors} />
					)}
					<InputForm
						name="email"
						placeholder="例) test@example.com"
						value={inputEmail}
						onChange={handleChangeInputEmail}
					/>
					<InputForm
						type="password"
						name="password"
						placeholder="Password"
						value={inputPassword}
						onChange={handleChangeInputPassword}
					/>
					<BaseButton title="ログインする" onClick={handleSignIn} />
				</BaseLayout>
			</ThemeProvider>
		</>
	);
}
