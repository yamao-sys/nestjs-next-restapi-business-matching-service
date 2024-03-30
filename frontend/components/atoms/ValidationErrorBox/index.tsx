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
	width: ${({ theme }) => theme.size.threeQuarters}
	background-color: ${({ theme }) => theme.color.lightDanger};
	border-radius: ${({ theme }) => theme.size.p5};
	padding: ${({ theme }) => theme.size.p10};
`;
Wrapper.defaultProps = { theme: theme };

const Text = styled.p`
	color: ${({ theme }) => theme.color.white};
`;
Text.defaultProps = { theme: theme };
