import { Meta, StoryObj } from '@storybook/react';
import { BaseButton } from '.';
import { fn } from '@storybook/test';

const meta = {
	title: 'components/atoms/BaseButton',
	component: BaseButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalPrimaryButton: Story = {
	args: {
		onClick: fn(),
		title: 'ボタン',
		width: 'threeQuarters',
		backgroundColor: 'normalPrimary',
		fontSize: 'p24',
		hoveredBackgroundColor: 'subtlePrimary',
	},
};
