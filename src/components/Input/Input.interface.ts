import { ComponentSize } from '../../model/types';

export interface InputProps {
	value: string;
	onChange: (value: string) => void;

	type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text';
	size?: ComponentSize;
	disabled?: boolean;

	placeholder?: string;
	label?: string;
	withIcon?: boolean;

	className?: string;
	style?: React.CSSProperties;
	customProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
