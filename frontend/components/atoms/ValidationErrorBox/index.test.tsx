import { render, screen } from '@testing-library/react';
import { ValidationErrorBox } from '.';

describe('ValidationErrorBox', () => {
	it('正しくレンダリングされること', () => {
		render(<ValidationErrorBox messages={['test message1']} />);

		const messageElement = screen.getByText('test message1');
		expect(messageElement).toBeInTheDocument();
	});

	it('propsで受け取ったmessagesが入っていること', () => {
		const inputMessages = ['test message1', 'test message2'];
		render(<ValidationErrorBox messages={inputMessages} />);

		const messageElements = screen.getAllByText(/test/i);
		expect(messageElements.length).toEqual(2);

		const messages = messageElements.map(
			(messageElement) => messageElement.textContent,
		);
		expect(messages).toEqual(inputMessages);
	});
});
