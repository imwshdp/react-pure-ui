import { ReactNode } from 'react';
import { ComponentSize } from '../../model/types';

export interface ButtonProps {
	children: ReactNode;
	size?: ComponentSize;
	disabled?: boolean;

	onClick?: () => void;

	className?: string;
	style?: React.CSSProperties;
	customProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
