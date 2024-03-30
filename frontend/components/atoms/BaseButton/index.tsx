import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = JSX.IntrinsicElements['button'];

export const BaseButton = ({ title, onClick }: Props) => {
	return <Button onClick={onClick}>{title}</Button>;
};

const Button = styled.button`
	display: block;
	width: ${({ theme }) => theme.size.threeQuarters};
	background-color: ${({ theme }) => theme.color.normalPrimary};
	border: none;
	cursol: pointer;
	outline: none;
	padding: ${({ theme }) => theme.size.p10};
	font-size: ${({ theme }) => theme.size.p24};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.white};
	appearance: none;
	border-radius: ${({ theme }) => theme.size.p10};
	transition: ${({ theme }) => theme.transition.normal};

	&:hover {
		background-color: ${({ theme }) => theme.color.subtlePrimary};
	}
`;
Button.defaultProps = { theme: theme };
