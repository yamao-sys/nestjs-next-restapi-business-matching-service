'use client';

import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = { labelText?: string } & JSX.IntrinsicElements['input'];

export const InputForm = ({
	labelText = '',
	type = 'text',
	name,
	placeholder,
	value,
	onChange,
}: Props) => {
	return (
		<Wrapper>
			{labelText && <Label htmlFor={name}>{labelText}</Label>}
			<Input
				id={name}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: ${({ theme }) => theme.size.full};
`;
Wrapper.defaultProps = { theme: theme };

const Label = styled.label`
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
Label.defaultProps = { theme: theme };

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
