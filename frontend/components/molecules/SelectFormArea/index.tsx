import { ValidationErrorBox } from '@/components/atoms/ValidationErrorBox';
import { theme } from '@/styles/theme';
import styled from 'styled-components';

type Option = {
	value: string;
	name: string;
};
type OptionProps = {
	options: Option[];
};
type CssProps = {
	width?: 'threeQuarters' | 'full';
};

type Props = JSX.IntrinsicElements['select'] &
	OptionProps & { labelText?: string; validationErrors?: String[] } & CssProps;

export const SelectFormArea = ({
	id,
	defaultValue,
	onChange,
	options,
	labelText = '',
	validationErrors = [],
	width = 'threeQuarters',
}: Props) => {
	return (
		<>
			{labelText && <Label htmlFor={id}>{labelText}</Label>}
			<Select id={id} defaultValue={defaultValue} onChange={onChange}>
				{options.map((option, i) => (
					<option key={i} value={option.value}>
						{option.name}
					</option>
				))}
			</Select>
			{!!validationErrors.length && (
				<ValidationErrorBox messages={validationErrors} />
			)}
		</>
	);
};

const Wrapper = styled.div<{ $width: CssProps['width'] }>`
	width: ${({ $width, theme }) =>
		$width ? theme.size[$width] : theme.size.threeQuarters};
`;
Wrapper.defaultProps = { theme: theme };

const Label = styled.label`
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
Label.defaultProps = { theme: theme };

const Select = styled.select`
	display: block;
	width: ${({ theme }) => theme.size.full};
	padding: ${({ theme }) => theme.size.p10};
	border-radius: ${({ theme }) => theme.size.p8};
	border: ${({ theme }) => theme.border.normalSolid.size}
		${({ theme }) => theme.border.normalSolid.type}
		${({ theme }) => theme.border.normalSolid.color};
	outline: none;
	font-size: ${({ theme }) => theme.size.p20};
`;
Select.defaultProps = { theme: theme };
