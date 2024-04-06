import { theme } from '@/styles/theme';
import Link from 'next/link';
import styled from 'styled-components';

type CssProps = {
	// ここの型をthemeに沿ったunionにする
	width: 'p80' | 'p140';
	backgroundColor?: 'normalPrimary' | 'subtleSuccess';
	hoveredBackgroundColor: 'palePrimary' | 'paleSuccess';
};

type Props = {
	href: string;
	title: string;
	width?: CssProps['width'];
	backgroundColor?: CssProps['backgroundColor'];
	hoveredBackgroundColor?: CssProps['hoveredBackgroundColor'];
};

export const NavigationLink = ({
	href,
	title,
	width = 'p140',
	backgroundColor = 'normalPrimary',
	hoveredBackgroundColor = 'palePrimary',
}: Props) => {
	return (
		<>
			<Navigation
				$width={width}
				$backgroundColor={backgroundColor}
				$hoveredBackgroundColor={hoveredBackgroundColor}
				href={href}
			>
				{title}
			</Navigation>
		</>
	);
};

const Navigation = styled(Link)<{
	$width: CssProps['width'];
	$backgroundColor: CssProps['backgroundColor'];
	$hoveredBackgroundColor: CssProps['hoveredBackgroundColor'];
}>`
	box-sizing: border-box;
	display: block;
	width: ${({ theme, $width }) => theme.size[$width]};
	height: ${({ theme }) => theme.size.p40};
	text-align: center;
	text-decoration: none;
	padding: ${({ theme }) => theme.size.p10};
	background-color: ${({ theme, $backgroundColor }) =>
		$backgroundColor
			? theme.color[$backgroundColor]
			: theme.color.normalPrimary};
	border-radius: ${({ theme }) => theme.size.p10};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.white};
	transition: ${({ theme }) => theme.transition.normal};

	&:hover {
		background-color: ${({ theme, $hoveredBackgroundColor }) =>
			theme.color[$hoveredBackgroundColor]};
	}
`;
Navigation.defaultProps = { theme: theme };
