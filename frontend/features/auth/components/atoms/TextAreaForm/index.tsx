import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = JSX.IntrinsicElements['textarea'];

export const TextAreaForm = ({ name, placeholder, value, onChange }: Props) => {
	return (
		<Wrapper>
			<TextArea
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: ${({ theme }) => theme.size.threeQuarters};
`;
Wrapper.defaultProps = { theme: theme };

const TextArea = styled.textarea`
	width: ${({ theme }) => theme.size.full};
	height: ${({ theme }) => theme.size.p100};
	border-radius: ${({ theme }) => theme.size.p8};
	border: ${({ theme }) => theme.border.normalSolid.size}
		${({ theme }) => theme.border.normalSolid.type}
		${({ theme }) => theme.border.normalSolid.color};
	outline: none;
	padding: ${({ theme }) => theme.size.p10};
	font-size: ${({ theme }) => theme.size.p20};
	resize: none;

	::placeholder {
		color: ${({ theme }) => theme.color.subtleGray};
	}
`;
TextArea.defaultProps = { theme: theme };
