'use client';

import { theme } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';
import { BaseLayout } from '../BaseLayout';
import { NavigationLink } from '@/components/atoms/NavigationLink';

export const SignUpThanks = () => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<BaseLayout title="会員登録" phase="thanks">
					<div>会員登録が完了しました。</div>
					<div>ご登録いただきありがとうございます。</div>
					<NavigationLink href="/sign_in" title="ログインページ" />
				</BaseLayout>
			</ThemeProvider>
		</>
	);
};
