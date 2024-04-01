import { fireEvent, render, screen } from '@testing-library/react';
import { InputForm } from '.';

describe('InputForm', () => {
	it('正しくレンダリングされること', () => {
		const handleChange = jest.fn();

		render(
			<InputForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
	});

	it('propsで受け取ったnameが入っていること', () => {
		const handleChange = jest.fn();

		render(
			<InputForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toHaveProperty('name', 'test name');
	});

	it('propsで受け取ったplace holderが入っていること', () => {
		const handleChange = jest.fn();

		render(
			<InputForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const inputElement = screen.getByPlaceholderText('test placeholder');
		expect(inputElement).toBeInTheDocument();
	});

	it('propsで受け取ったvalueが入っていること', () => {
		const handleChange = jest.fn();

		render(
			<InputForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const inputElement = screen.getByDisplayValue('test value');
		expect(inputElement).toBeInTheDocument();
	});

	it('input要素の入力時にonChangeイベントハンドラがトリガーされる', () => {
		const handleChange = jest.fn();

		render(
			<InputForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const inputElement = screen.getByRole('textbox');
		fireEvent.change(inputElement, {
			target: { value: 'test value edited' },
		});
		expect(handleChange).toHaveBeenCalled();
	});

	it('propsで受け取ったtypeが入っていること', () => {
		const handleChange = jest.fn();

		render(
			<InputForm
				type="password"
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const inputElement = screen.getByPlaceholderText('test placeholder');
		expect(inputElement).toHaveProperty('type', 'password');
	});
});
