'use client';

import { useState } from 'react';
import { FetchTodoResponseDto } from '@/api/todos/@types';
import { putUpdateTodo } from '@/features/todos/server_actions/putUpdateTodo';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { redirectToTopPage } from '@/features/todos/server_actions/redirectToTopPage';
import { BaseLayout } from '../BaseLayout';
import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { InputForm } from '@/components/atoms/InputForm';
import { TextAreaForm } from '@/features/auth/components/atoms/TextAreaForm';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

type Props = {
	id: string;
	todo: FetchTodoResponseDto | undefined;
};

export function TodoUpdateForm({ id, todo }: Props) {
	const [inputTitle, setInputTitle] = useState(todo?.title ?? '');
	const [inputContent, setInputContent] = useState(todo?.content ?? '');
	const [validationErrors, setValidationErrors] = useState<String[]>([]);

	const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInputTitle(e.target.value);

	const handleChangeInputContent = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => setInputContent(e.target.value);

	const handleSubmit = async () => {
		try {
			const response = await putUpdateTodo(id, {
				title: inputTitle,
				content: inputContent,
			});

			if (!!response?.errors?.length) {
				setValidationErrors(response.errors);
			} else {
				window.alert('TODOの更新に成功しました。');
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
				<BaseLayout title="Todo編集">
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
					<BaseButton title="保存する" onClick={handleSubmit} />
				</BaseLayout>
			</ThemeProvider>
		</>
	);
}
