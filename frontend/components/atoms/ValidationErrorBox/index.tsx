import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Props = {
	messages: String[];
};

export const ValidationErrorBox = ({ messages }: Props) => {
	return (
		<Wrapper>
			{messages.map((message, i) => (
				<Text key={i}>{message}</Text>
			))}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: ${({ theme }) => theme.size.full};
	padding: ${({ theme }) => theme.size.p10} 0;
`;
Wrapper.defaultProps = { theme: theme };

const Text = styled.p`
	color: ${({ theme }) => theme.color.normalDanger};
`;
Text.defaultProps = { theme: theme };
