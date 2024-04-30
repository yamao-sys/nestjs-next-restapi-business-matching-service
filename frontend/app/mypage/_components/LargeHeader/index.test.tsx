import { render, screen } from '@testing-library/react';
import { LargeHeader } from '.';

describe('frontend/app/mypage/_components/LargeHeader', () => {
	it('propsで受け取ったchildrenをもとに表示されること', () => {
		render(<LargeHeader title="test header" />);

		expect(
			screen.getByRole('heading', { name: 'test header' }),
		).toBeInTheDocument();
	});
});
