import { Container } from '@/components/organisms/Container';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { theme } from '@/styles/theme';
import { ReactNode } from 'react';
import styled from 'styled-components';

type CssProps = {
	color: 'normalGray' | 'normalPrimary';
};

type Props = {
	title: string;
	phase: 'form' | 'confirm' | 'thanks';
	children: ReactNode;
};

export const BaseLayout = ({ title, phase, children }: Props) => {
	return (
		<>
			<Container>
				<Title>{title}</Title>
				<PhaseWrapper>
					<Phase>
						<PhaseText
							$color={phase === 'form' ? 'normalPrimary' : 'normalGray'}
						>
							登録情報の入力
						</PhaseText>
						<PhaseText $color="normalGray">&gt;&gt;</PhaseText>
						<PhaseText
							$color={phase === 'confirm' ? 'normalPrimary' : 'normalGray'}
						>
							内容の確認・登録
						</PhaseText>
						<PhaseText $color="normalGray">&gt;&gt;</PhaseText>
						<PhaseText
							$color={phase === 'thanks' ? 'normalPrimary' : 'normalGray'}
						>
							登録完了
						</PhaseText>
					</Phase>
				</PhaseWrapper>
				<ContentWrapper>{children}</ContentWrapper>
			</Container>
		</>
	);
};

const Title = styled.h1`
	text-align: center;
`;

const PhaseWrapper = styled.div`
	display: flex;
	width: ${({ theme }) => theme.size.full};
	justify-content: center;
	margin-top: ${({ theme }) => theme.size.p20};
`;
PhaseWrapper.defaultProps = { theme: theme };

const Phase = styled.div`
	display: flex;
	justify-content: space-between;
	width: ${({ theme }) => theme.size.threeQuarters};
`;
Phase.defaultProps = { theme: theme };

const PhaseText = styled.div<{
	$color: CssProps['color'];
}>`
	color: ${({ $color, theme }) => theme.color[$color]};
`;
