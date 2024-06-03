import { ReactNode } from 'react';

export interface AppearanceTransitionProps {
	children: ReactNode;
	isRendering: boolean;
	transitionTimeInSec?: number;
}
