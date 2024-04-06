'use client';

import { theme } from '@/styles/theme';
import styled from 'styled-components';

type CssProps = {
	width?: 'threeQuarters' | 'quarter' | 'full';
	backgroundColor?: 'normalPrimary' | 'normalGray';
	fontSize?: 'p24' | 'p16';
	hoveredBackgroundColor?: 'subtlePrimary' | 'subtleGray';
};

type Props = JSX.IntrinsicElements['button'] & CssProps;

export const BaseButton = ({
	onClick,
	title,
	width,
	backgroundColor,
	fontSize,
	hoveredBackgroundColor,
}: Props) => {
	return (
		<Button
			onClick={onClick}
			$width={width}
			$backgroundColor={backgroundColor}
			$fontSize={fontSize}
			$hoveredBackgroundColor={hoveredBackgroundColor}
		>
			{title}
		</Button>
	);
};

const Button = styled.button<{
	$width: CssProps['width'];
	$backgroundColor: CssProps['backgroundColor'];
	$fontSize: CssProps['fontSize'];
	$hoveredBackgroundColor: CssProps['hoveredBackgroundColor'];
}>`
	display: block;
	width: ${({ $width, theme }) =>
		$width ? theme.size[$width] : theme.size.threeQuarters};
	background-color: ${({ $backgroundColor, theme }) =>
		$backgroundColor
			? theme.color[$backgroundColor]
			: theme.color.normalPrimary};
	border: none;
	cursol: pointer;
	outline: none;
	padding: ${({ theme }) => theme.size.p10};
	font-size: ${({ $fontSize, theme }) =>
		$fontSize ? theme.size[$fontSize] : theme.size.p24};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.white};
	appearance: none;
	border-radius: ${({ theme }) => theme.size.p10};
	transition: ${({ theme }) => theme.transition.normal};

	&:hover {
		background-color: ${({ $hoveredBackgroundColor, theme }) =>
			$hoveredBackgroundColor
				? theme.color[$hoveredBackgroundColor]
				: theme.color.subtlePrimary};
	}
`;
Button.defaultProps = { theme: theme };
