import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
	return (
		<>
			<ContentWrapper>{children}</ContentWrapper>
		</>
	);
};
