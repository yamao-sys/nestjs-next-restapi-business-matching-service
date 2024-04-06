import { fireEvent, render, screen } from '@testing-library/react';
import { TextAreaForm } from '.';

describe('feature/auth/components/atoms/TextAreaForm', () => {
	it('正しくレンダリングされること', () => {
		const handleChange = jest.fn();

		render(
			<TextAreaForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const textAreaElement = screen.getByDisplayValue('test value');
		expect(textAreaElement).toBeInTheDocument();
	});

	it('propsで受け取ったnameが入っていること', () => {
		const handleChange = jest.fn();

		render(
			<TextAreaForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const textAreaElement = screen.getByDisplayValue('test value');
		expect(textAreaElement).toHaveProperty('name', 'test name');
	});

	it('propsで受け取ったplaceholderが入っていること', () => {
		const handleChange = jest.fn();

		render(
			<TextAreaForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const textAreaElement = screen.getByPlaceholderText('test placeholder');
		expect(textAreaElement).toBeInTheDocument();
	});

	it('propsで受け取ったvalueが入っていること', () => {
		const handleChange = jest.fn();

		render(
			<TextAreaForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const textAreaElement = screen.getByDisplayValue('test value');
		expect(textAreaElement).toBeInTheDocument();
	});

	it('input要素の入力時にonChangeイベントハンドラがトリガーされる', () => {
		const handleChange = jest.fn();

		render(
			<TextAreaForm
				name="test name"
				placeholder="test placeholder"
				value="test value"
				onChange={handleChange}
			/>,
		);

		const textAreaElement = screen.getByDisplayValue('test value');
		fireEvent.change(textAreaElement, {
			target: { value: 'test value edited' },
		});
		expect(handleChange).toHaveBeenCalled();
	});
});
