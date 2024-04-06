import { BaseButton } from './index';
import { fireEvent, render, screen } from '@testing-library/react';

describe('BaseButton', () => {
	it('正しくレンダリングされる', () => {
		render(<BaseButton title="テスト" />);

		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toBeInTheDocument();
	});

	it('title propsから正しくテキストが表示される', () => {
		render(<BaseButton title="テスト" />);

		const buttonElement = screen.queryByText(/テスト/i);
		expect(buttonElement).toBeInTheDocument();
	});

	it('クリック時にonClickイベントハンドラがトリガーされる', () => {
		const handleClick = jest.fn();

		render(<BaseButton title="テスト" onClick={handleClick} />);

		const buttonElement = screen.getByText(/テスト/i);
		fireEvent.click(buttonElement);

		expect(handleClick).toHaveBeenCalled();
	});
});
