'use client';

import { useState } from 'react';
import { postSignUp } from '@/features/auth/server_actions/postSignUp';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { BaseLayout } from '../BaseLayout';
import { InputForm } from '@/components/molecules/InputForm';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

export default function SignUpForm() {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputEmail(e.target.value);

	const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputPassword(e.target.value);

	const handleSignUp = async () => {
		try {
			const response = await postSignUp({
				email: inputEmail,
				password: inputPassword,
			});

			if (!!response.errors.length) {
				setValidationErrors(response.errors);
				setInputPassword('');
			} else {
				window.alert('会員登録に成功しました！');
				setInputEmail('');
				setInputPassword('');
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
				<BaseLayout title="会員登録">
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
					<BaseButton title="登録する" onClick={handleSignUp} />
				</BaseLayout>
			</ThemeProvider>
		</>
	);
}
