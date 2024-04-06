'use client';

import { useRouter } from 'next/navigation';
import { useSignUpContext } from '@/features/auth/contexts/SignUpContext';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { BaseLayout } from '../BaseLayout';
import { HTTPError } from '@aspida/fetch';
import { handleApiErrors } from '@/lib/handleApiErrors';
import { postSignUp } from '@/features/auth/server_actions/postSignUp';
import { BaseButton } from '@/components/atoms/BaseButton';

export const SignUpConfirmation = () => {
	const { inputEmail, inputPassword } = useSignUpContext();

	const router = useRouter();
	const handleBackPage = () => router.push('/sign_up');

	const handleSignUp = async () => {
		try {
			await postSignUp({
				email: inputEmail,
				password: inputPassword,
			});
			router.push('/sign_up/thanks');
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
				<BaseLayout title="会員登録" phase="confirm">
					<Row>
						<Column>メールアドレス: </Column>
						<Column>{inputEmail}</Column>
					</Row>
					<Row>
						<Column>パスワード: </Column>
						<Column>{inputPassword}</Column>
					</Row>
					<Row>
						<BaseButton
							width="quarter"
							backgroundColor="normalGray"
							fontSize="p16"
							hoveredBackgroundColor="subtleGray"
							onClick={handleBackPage}
							title="戻る"
						/>
						<BaseButton
							width="quarter"
							fontSize="p16"
							onClick={handleSignUp}
							title="登録する"
						/>
					</Row>
				</BaseLayout>
			</ThemeProvider>
		</>
	);
};

const Row = styled.div`
	display: flex;
	width: ${({ theme }) => theme.size.threeQuarters};
	justify-content: space-around;
`;
Row.defaultProps = { theme: theme };

const Column = styled.div`
	width: 50%;
	vertical-align: middle;
`;
