import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { InputForm } from '@/components/atoms/InputForm';
import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = JSX.IntrinsicElements['input'] & { validationErrors?: String[] };

export const InputTextFormArea = ({
	name,
	placeholder,
	value,
	onChange,
	validationErrors = [],
}: Props) => {
	return (
		<>
			<Wrapper>
				<InputForm
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

const Wrapper = styled.div`
	width: ${({ theme }) => theme.size.threeQuarters};
`;
Wrapper.defaultProps = { theme: theme };
