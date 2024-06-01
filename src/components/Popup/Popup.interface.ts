import { CSSProperties, MutableRefObject, ReactNode } from 'react';

export interface PopupProps {
	parentNode: ReactNode | Iterable<ReactNode>;
	popupNode: ReactNode | Iterable<ReactNode>;
	popupNodeGap?: number;

	preferredPosition?: 'top' | 'bottom' | 'left' | 'right';
	openBy: 'click' | 'hover';

	config?: {
		useParentNodeWidth?: boolean;
		useParentNodeHeight?: boolean;

		customToggleNodeRef?: MutableRefObject<HTMLElement | null>;
		customIsOpen?: boolean;
	};

	className?: string;
	style?: CSSProperties;
}
