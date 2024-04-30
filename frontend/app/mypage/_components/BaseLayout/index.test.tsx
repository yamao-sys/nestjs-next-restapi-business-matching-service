import { render, screen } from '@testing-library/react';
import { BaseLayout } from '.';

describe('frontend/app/mypage/_components/BaseLayout', () => {
	it('propsで受け取ったchildrenをもとに表示されること', () => {
		render(
			<BaseLayout>
				<div>test content</div>
			</BaseLayout>,
		);

		expect(screen.getByText('test content')).toBeInTheDocument();
	});
});
