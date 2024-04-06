import { Meta, StoryObj } from '@storybook/react';
import { InputForm } from '.';
import { fn } from '@storybook/test';

const meta = {
	title: 'components/atoms/InputForm',
	component: InputForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof InputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalTextbox: Story = {
	args: {
		name: 'normal_textbox',
		placeholder: 'Normal Textbox',
		value: '',
		onChange: fn(),
	},
};
