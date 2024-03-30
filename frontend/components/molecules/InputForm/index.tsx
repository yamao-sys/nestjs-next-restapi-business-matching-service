import { InputTextForm } from '@/components/atoms/InputTextForm';
import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = {
	type?: string;
	name: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputForm = ({
	type = 'text',
	name,
	placeholder,
	value,
	onChange,
}: Props) => {
	return (
		<Wrapper>
			<InputTextForm
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
	width: ${({ theme }) => theme.size.threeQuarters};
`;
Wrapper.defaultProps = { theme: theme };
