'use client';

import { NavigationLink } from '@/components/atoms/NavigationLink';
import styled from 'styled-components';

export const TodoNavigationHeader = () => {
	return (
		<Wrapper>
			<NavigationLink href="/todos" title="TOP" />
			<NavigationLink href="/todos/new" title="新規作成" />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: space-around;
`;
