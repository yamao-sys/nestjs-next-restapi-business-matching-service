import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { InputForm } from '@/components/atoms/InputForm';
import { theme } from '@/styles/theme';
import styled from 'styled-components';

type CssProps = {
	width?: 'threeQuarters' | 'full';
};

type Props = JSX.IntrinsicElements['input'] & {
	validationErrors?: String[];
	labelText?: string;
} & CssProps;

export const InputFormArea = ({
	type = 'text',
	name,
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
				<InputForm
					labelText={labelText}
					type={type}
					name={name}
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
