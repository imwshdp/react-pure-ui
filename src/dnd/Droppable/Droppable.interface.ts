import { CSSProperties, ReactNode } from 'react';

export interface DroppableProps {
	children?: ReactNode;

	style?: CSSProperties;
	className?: string;

	customProps?: React.InputHTMLAttributes<HTMLElement>;
}
