import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	children: ReactNode;
};

export const ContentWrapper = ({ children }: Props) => {
	return (
		<>
			<Wrapper>{children}</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: ${({ theme }) => theme.size.p40};
	margin-bottom: ${({ theme }) => theme.size.p40};
	gap: ${({ theme }) => theme.size.p30};
`;
Wrapper.defaultProps = { theme: theme };
