import type { CommonSelectProps, SingleSelectOptionType } from '../../Select.interface.ts';

export interface SingleSelectProps extends CommonSelectProps {
	type: 'single';
	value: SingleSelectOptionType;
	onChange: (selectOption: SingleSelectOptionType) => void;
}
