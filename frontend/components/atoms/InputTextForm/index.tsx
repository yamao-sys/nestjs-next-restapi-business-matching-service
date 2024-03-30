'use client';

import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = {
	type?: string;
	name: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputTextForm({
	type = 'text',
	name,
	placeholder,
	value,
	onChange,
}: Props) {
	return (
		<>
			<Input
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</>
	);
}

const Input = styled.input`
	display: block;
	width: ${({ theme }) => theme.size.full};
	height: ${({ theme }) => theme.size.half};
	border-radius: ${({ theme }) => theme.size.p8};
	border: ${({ theme }) => theme.border.normalSolid.size}
		${({ theme }) => theme.border.normalSolid.type}
		${({ theme }) => theme.border.normalSolid.color};
	outline: none;
	padding: ${({ theme }) => theme.size.p10};
	font-size: ${({ theme }) => theme.size.p20};

	::placeholder {
		color: ${({ theme }) => theme.color.subtleGray};
	}
`;
Input.defaultProps = { theme: theme };
