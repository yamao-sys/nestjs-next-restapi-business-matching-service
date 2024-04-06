import { render, screen } from '@testing-library/react';
import { NavigationLink } from '.';

describe('NavidationLink', () => {
	it('正しくレンダリングされること', () => {
		render(<NavigationLink href="/test" title="test link" />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toBeInTheDocument();
	});

	it('propsで受け取ったhrefが入っていること', () => {
		render(<NavigationLink href="/test" title="test link" />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toHaveProperty('href', 'http://localhost/test');
	});

	it('propsで受け取ったtitleが入っていること', () => {
		render(<NavigationLink href="/test" title="test link" />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toHaveTextContent('test link');
	});
});
