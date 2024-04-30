import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import styled from 'styled-components';

type CssProps = {
	width: keyof typeof theme.size;
};

type Props = {
	children: ReactNode;
} & CssProps;

export const BaseBox = ({ children, width = 'full' }: Props) => {
	return <Wrapper $width={width}>{children}</Wrapper>;
};

const Wrapper = styled.div<{ $width: CssProps['width'] }>`
	width: ${({ $width, theme }) =>
		$width ? theme.size[$width] : theme.size.threeQuarters};
`;
Wrapper.defaultProps = { theme: theme };
