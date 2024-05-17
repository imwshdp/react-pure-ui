import { CSSProperties } from 'react';

export interface RadioButtonProps {
	value: number | string;
	onChange: () => void;
	checked: boolean;

	disabled?: boolean;
	label: string;
	name?: string;

	style?: CSSProperties;
	className?: string;

	customProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
