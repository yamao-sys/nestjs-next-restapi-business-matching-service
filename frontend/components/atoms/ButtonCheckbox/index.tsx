import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = JSX.IntrinsicElements['button'];

export const ButtonCheckbox = ({
	'aria-checked': ariaChecked,
	onClick,
	title,
}: Props) => {
	return (
		<Button role="checkbox" aria-checked={ariaChecked} onClick={onClick}>
			{title}
		</Button>
	);
};

const Button = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.normalPrimary};
	background: ${({ theme }) => theme.color.white};
	border: ${({ theme }) => theme.border.primarySolid.size}
		${({ theme }) => theme.border.primarySolid.type}
		${({ theme }) => theme.border.primarySolid.color};
	border-radius: ${({ theme }) => theme.size.p10};
	height: ${({ theme }) => theme.size.p30};
	padding: ${({ theme }) => theme.size.p8} ${({ theme }) => theme.size.p16};
`;
Button.defaultProps = { theme: theme };
