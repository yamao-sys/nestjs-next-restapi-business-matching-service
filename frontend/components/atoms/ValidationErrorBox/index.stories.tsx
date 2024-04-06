import { Meta, StoryObj } from '@storybook/react';
import { ValidationErrorBox } from '.';

const meta = {
	title: 'components/atoms/ValidationErrorBox',
	component: ValidationErrorBox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ValidationErrorBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ValidationErrorMessages: Story = {
	args: {
		messages: ['メールアドレスは必須です。', 'パスワードは必須です。'],
	},
};
