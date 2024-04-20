import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { theme } from '@/styles/theme';
import styled from 'styled-components';

type CssProps = {
	width?: 'threeQuarters' | 'full';
};

type Props = JSX.IntrinsicElements['textarea'] & {
	validationErrors?: String[];
	labelText?: string;
} & CssProps;

export const TextFormArea = ({
	id,
	placeholder,
	value,
	onChange,
	validationErrors = [],
	labelText = '',
	width = 'threeQuarters',
}: Props) => {
	return (
		<>
			<Wrapper $width={width}>
				{labelText && <Label htmlFor={id}>{labelText}</Label>}
				<TextArea
					id={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				{!!validationErrors.length && (
					<ValidationErrorBox messages={validationErrors} />
				)}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div<{ $width: CssProps['width'] }>`
	width: ${({ $width, theme }) =>
		$width ? theme.size[$width] : theme.size.threeQuarters};
`;
Wrapper.defaultProps = { theme: theme };

const Label = styled.label`
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
Label.defaultProps = { theme: theme };

const TextArea = styled.textarea`
	display: block;
	width: ${({ theme }) => theme.size.full};
	height: ${({ theme }) => theme.size.p140};
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
