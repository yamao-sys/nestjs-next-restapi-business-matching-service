import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	children: ReactNode;
};

export const Container = ({ children }: Props) => {
	return (
		<>
			<ContainerWrapper>{children}</ContainerWrapper>
		</>
	);
};

const ContainerWrapper = styled.div`
	width: ${({ theme }) => theme.size.half};
	margin: ${({ theme }) => theme.size.p80} auto;
`;
ContainerWrapper.defaultProps = { theme: theme };
