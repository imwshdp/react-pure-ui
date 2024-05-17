import { CSSProperties, ReactNode } from 'react';

export interface DraggableProps {
	children: ReactNode;

	style?: CSSProperties;
	className?: string;

	customProps?: React.InputHTMLAttributes<HTMLElement>;
}
