'use client';

import { FetchAllTodosResponseDto } from '@/api/todos/@types';
import { deleteTodo } from '@/features/todos/server_actions/deleteTodo';
import { useState } from 'react';
import { BaseLayout } from '../BaseLayout';
import styled, { ThemeProvider } from 'styled-components';
import { NavigationLink } from '@/components/atoms/NavigationLink';
import { theme } from '@/styles/theme';

type Props = {
	todos: FetchAllTodosResponseDto['todos'];
};

export function TodoList({ todos }: Props) {
	const [showTodos, setShowTodos] =
		useState<FetchAllTodosResponseDto['todos']>(todos);

	const handleDeleteTodo = async (id: string, title: string) => {
		if (!window.confirm(`${title}のTODOを削除しますか？`)) return;

		await deleteTodo(id);
		window.alert(`${title}のTODOを削除しました。`);

		const newTodos = todos?.filter((todo) => todo.id !== id) || [];
		setShowTodos(newTodos);
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<BaseLayout title="Todoリスト">
					{!!showTodos?.length ? (
						showTodos.map((todo) => (
							<TodoRow key={todo.id}>
								<TodoTitleWrapper>
									<TodoTitle>{todo.title}</TodoTitle>
								</TodoTitleWrapper>
								<ButtonsWrapper>
									<NavigationLink
										href={`/todos/edit/${todo.id}`}
										title="編集"
										width="p80"
										backgroundColor="subtleSuccess"
										hoveredBackgroundColor="paleSuccess"
									/>
									<DeleteButton
										onClick={() => handleDeleteTodo(todo.id, todo.title)}
									>
										削除
									</DeleteButton>
								</ButtonsWrapper>
							</TodoRow>
						))
					) : (
						<NotExistsTodosNotion>※ まだTODOが未登録です</NotExistsTodosNotion>
					)}
				</BaseLayout>
			</ThemeProvider>
		</>
	);
}

const NotExistsTodosNotion = styled.span`
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
NotExistsTodosNotion.defaultProps = { theme: theme };

const TodoRow = styled.div`
	display: flex;
	width: ${({ theme }) => theme.size.full};
	padding: ${({ theme }) => theme.size.p20};
	border: ${({ theme }) => theme.border.primarySolid.size}
		${({ theme }) => theme.border.primarySolid.type}
		${({ theme }) => theme.border.primarySolid.color};
	border-radius: ${({ theme }) => theme.size.p10};
`;
TodoRow.defaultProps = { theme: theme };

const TodoTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	width: ${({ theme }) => theme.size.half};
`;
TodoTitleWrapper.defaultProps = { theme: theme };

const TodoTitle = styled.span`
	display: block;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
TodoTitle.defaultProps = { theme: theme };

const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: end;
	width: ${({ theme }) => theme.size.half};
`;
ButtonsWrapper.defaultProps = { theme: theme };

const DeleteButton = styled.button`
	display: block;
	width: ${({ theme }) => theme.size.p80};
	height: ${({ theme }) => theme.size.p40};
	background-color: ${({ theme }) => theme.color.subtleDanger};
	border: none;
	outline: none;
	margin-left: ${({ theme }) => theme.size.p10};
	padding: ${({ theme }) => theme.size.p10};
	font-size: ${({ theme }) => theme.size.p16};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.white};
	appearance: none;
	border-radius: ${({ theme }) => theme.size.p10};
	transition: ${({ theme }) => theme.transition.normal};

	&:hover {
		background-color: ${({ theme }) => theme.color.paleDanger};
	}
`;
DeleteButton.defaultProps = { theme: theme };
