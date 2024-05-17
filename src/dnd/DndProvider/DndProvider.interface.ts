import { CSSProperties, ReactNode } from 'react';

export interface DndProviderProps {
	children: ReactNode;

	withDroppableIndication?: boolean;
	droppableIndicationClassName?: string;
	droppableIndicationStyles?: CSSProperties;

	withSavingPositionAfterDrop?: boolean;
}
