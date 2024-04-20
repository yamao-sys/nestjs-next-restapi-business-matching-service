import { fireEvent, render, screen } from '@testing-library/react';
import { InputFormArea } from '.';

describe('feature/auth/components/molecules/InputFormArea', () => {
	// describe('unit test', () => {
	// });

	describe('integration test', () => {
		it('propsで受け取った値が関連要素に反映されていること', () => {
			const handleChange = jest.fn();

			const inputMessages = ['test message1', 'test message2'];

			render(
				<InputFormArea
					type="text"
					name="test name"
					placeholder="test placeholder"
					value="test value"
					onChange={handleChange}
					validationErrors={inputMessages}
				/>,
			);

			// NOTE: placeholderに該当する<input>タグの存在を確認
			const inputElement = screen.getByPlaceholderText(
				'test placeholder',
			) as HTMLInputElement;
			expect(inputElement).toBeInTheDocument();

			// NOTE: 上記<input>タグのtypeがpropsで受け取った値であることを確認
			expect(inputElement).toHaveProperty('type', 'text');

			// NOTE: 上記<input>タグのname, valueがpropsで受け取った値であることを確認
			expect(inputElement).toHaveProperty('name', 'test name');
			expect(inputElement.value).toEqual('test value');

			// NOTE: 受け取ったpropsのonChangeが発火することの確認
			fireEvent.change(inputElement, {
				target: { value: 'test value edited' },
			});
			expect(handleChange).toHaveBeenCalled();

			// NOTE: propsで受け取ったvalidationErrorsが表示されていること
			const messageElements = screen.getAllByText(/test/i);
			expect(messageElements.length).toEqual(2);

			const messages = messageElements.map(
				(messageElement) => messageElement.textContent,
			);
			expect(messages).toEqual(inputMessages);
		});
	});
});
