import { ReactNode } from 'react';
import { ComponentSize } from '../../model/types';

export interface ButtonProps {
	children: ReactNode;
	size?: ComponentSize;
	disabled?: boolean;

	className?: string;
	style?: React.CSSProperties;
	customProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
