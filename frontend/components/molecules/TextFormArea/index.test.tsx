import { fireEvent, render, screen } from '@testing-library/react';
import { TextFormArea } from '.';

describe('components/molecules/TextFormArea', () => {
	describe('unit test', () => {
		it('propsで受け取った値が関連要素に反映されていること', () => {
			const handleChange = jest.fn();

			const inputMessages = ['test message1', 'test message2'];

			render(
				<TextFormArea
					id="test_id"
					placeholder="test placeholder"
					value="test value"
					onChange={handleChange}
					validationErrors={inputMessages}
					labelText="test label"
				/>,
			);

			// NOTE: placeholderに該当する<textarea>タグの存在を確認
			const inputElement = screen.getByPlaceholderText(
				'test placeholder',
			) as HTMLInputElement;
			expect(inputElement).toBeInTheDocument();

			// NOTE: 上記<textarea>タグのid, valueがpropsで受け取った値であることを確認
			expect(inputElement).toHaveProperty('id', 'test_id');
			expect(inputElement.value).toEqual('test value');

			// NOTE: 受け取ったpropsのonChangeが発火することの確認
			fireEvent.change(inputElement, {
				target: { value: 'test value edited' },
			});
			expect(handleChange).toHaveBeenCalled();

			// NOTE: 上記<textarea>タグのlabelがpropsで受け取った値であることを確認
			expect(screen.getByLabelText('test label')).toBeInTheDocument();

			// NOTE: propsで受け取ったvalidationErrorsが表示されていること
			const messageElements = screen.getAllByText(/test message/i);
			expect(messageElements.length).toEqual(2);

			const messages = messageElements.map(
				(messageElement) => messageElement.textContent,
			);
			expect(messages).toEqual(inputMessages);
		});
	});
});
