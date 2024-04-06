import { render, screen } from '@testing-library/react';
import { BaseLayout } from '.';

describe('frontend/features/auth/components/organisms/BaseLayout', () => {
	it('propsで受け取ったtitleが表示されること', () => {
		render(
			<BaseLayout title="test title">
				<div>test content</div>
			</BaseLayout>,
		);

		expect(screen.getByText('test title')).toBeInTheDocument();
	});

	it('propsで受け取ったchildrenが表示されること', () => {
		render(
			<BaseLayout title="test title">
				<div>test content</div>
			</BaseLayout>,
		);

		expect(screen.getByText('test content')).toBeInTheDocument();
	});
});
