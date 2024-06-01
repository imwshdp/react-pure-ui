import { ComponentSize } from '@model/types';

import type { SingleSelectProps } from './ui/SingleSelect/SingleSelect.interface';
import type { MultiSelectProps } from './ui/MultiSelect/MultiSelect.interface';

// option types
export type SelectOptionType = {
	value: number | string;
	label: string;
};

export type SingleSelectOptionType = SelectOptionType | undefined;

export type MultiSelectOptionType = SelectOptionType;

// select types
export interface CommonSelectProps {
	options: SelectOptionType[];

	size?: ComponentSize;
	customOptionsListHeight?: number;
	renderWithPortal?: boolean;
	closeOnOutsideClick?: boolean;

	className?: string;
	style?: React.CSSProperties;
	customProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

export interface ExtendedSelectProps {
	isOpen: boolean;
	toggleOptions: () => void;
}

// props types
export type SelectProps = SingleSelectProps | MultiSelectProps;
