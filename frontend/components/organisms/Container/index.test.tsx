import { render, screen } from '@testing-library/react';
import { Container } from '.';

describe('Container', () => {
	it('正しくレンダリングされること(childrenがレンダリングされること)', () => {
		render(
			<Container>
				<div>test</div>
			</Container>,
		);

		const childElement = screen.getByText('test');
		expect(childElement).toBeInTheDocument();
	});
});
