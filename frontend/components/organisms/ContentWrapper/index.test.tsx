import { render, screen } from '@testing-library/react';
import { ContentWrapper } from '.';

describe('ContentWrapper', () => {
	it('正しくレンダリングされること(childrenがレンダリングされること)', () => {
		render(
			<ContentWrapper>
				<div>test</div>
			</ContentWrapper>,
		);

		const childElement = screen.getByText('test');
		expect(childElement).toBeInTheDocument();
	});
});
