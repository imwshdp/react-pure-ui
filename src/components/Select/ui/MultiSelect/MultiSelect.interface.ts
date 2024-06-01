import type { CommonSelectProps, MultiSelectOptionType } from '../../Select.interface.ts';

export interface MultiSelectProps extends CommonSelectProps {
	type: 'multi';
	value: MultiSelectOptionType[];
	onChange: (selectOption: MultiSelectOptionType[]) => void;
}
