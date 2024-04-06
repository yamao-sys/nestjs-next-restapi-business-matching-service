'use client';

import { postCreateTodo } from '@/features/todos/server_actions/postCreateTodo';
import { useState } from 'react';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { redirectToTopPage } from '@/features/todos/server_actions/redirectToTopPage';
import { BaseLayout } from '../BaseLayout';
import { InputForm } from '@/components/atoms/InputForm';
import { TextAreaForm } from '@/features/auth/components/atoms/TextAreaForm';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

export function TodoCreateForm() {
	const [inputTitle, setInputTitle] = useState('');
	const [inputContent, setInputContent] = useState('');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputTitle(e.target.value);

	const handleChangeInputContent = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => setInputContent(e.target.value);

	const handleSubmit = async () => {
		try {
			const response = await postCreateTodo({
				title: inputTitle,
				content: inputContent,
			});

			if (!!response?.errors?.length) {
				setValidationErrors(response.errors);
			} else {
				window.alert('TODOの作成に成功しました。');
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
				<BaseLayout title="Todo新規作成">
					{!!validationErrors.length && (
						<ValidationErrorBox messages={validationErrors} />
					)}
					<InputForm
						name="text"
						placeholder="Todo Title"
						value={inputTitle}
						onChange={handleChangeInputTitle}
					/>
					<TextAreaForm
						name="content"
						placeholder="Todo Content"
						value={inputContent}
						onChange={handleChangeInputContent}
					/>
					<BaseButton title="登録する" onClick={handleSubmit} />
				</BaseLayout>
			</ThemeProvider>
		</>
	);
}
