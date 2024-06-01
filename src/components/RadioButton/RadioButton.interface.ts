import { CSSProperties } from 'react';

export interface RadioButtonProps {
	value: string | number;
	onChange: (value: string | number) => void;
	checked: boolean;

	disabled?: boolean;
	label: string;
	name?: string;

	style?: CSSProperties;
	className?: string;
	customProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
