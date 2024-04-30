import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = {
	title: string;
};

export const LargeHeader = ({ title }: Props) => {
	return (
		<>
			<Header>{title}</Header>
		</>
	);
};

const Header = styled.h1`
	width: ${({ theme }) => theme.size.threeQuarters};
	padding-bottom: ${({ theme }) => theme.size.p8};
	font-size: ${({ theme }) => theme.size.p20};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	text-align: center;
	border-bottom: 1px dotted rgb(230, 230, 230);
`;
Header.defaultProps = { theme: theme };
