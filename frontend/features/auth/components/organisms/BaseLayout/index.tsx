import { Container } from '@/components/organisms/Container';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	title: string;
	children: ReactNode;
};

export const BaseLayout = ({ title, children }: Props) => {
	return (
		<>
			<Container>
				<Title>{title}</Title>
				<ContentWrapper>{children}</ContentWrapper>
			</Container>
		</>
	);
};

const Title = styled.h1`
	text-align: center;
`;
