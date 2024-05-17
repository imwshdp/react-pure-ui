import React, { useEffect, useId } from 'react';

import { DndProviderProps } from './DndProvider.interface.ts';
import styles from './DndProvider.module.css';
import { DND_DRAGGABLE_CLASS, DND_PROVIDER_CLASS } from '../../model/dnd.ts';
import { cn } from '../../helpers/cn.ts';

function DndProvider({
	children,
	// droppableIndicationClassName,
	// droppableIndicationStyles,
	// withDroppableIndication = false,
	withSavingPositionAfterDrop = false
}: DndProviderProps) {
	const uniqueId = useId();
	const uniqueDndProviderClassName = `${DND_PROVIDER_CLASS}-${uniqueId}`;

	useEffect(() => {
		const provider = document.getElementsByClassName(uniqueDndProviderClassName)[0];
		const draggableItems = provider?.getElementsByClassName(DND_DRAGGABLE_CLASS) || [];

		for (const draggableItem of draggableItems) {
			(draggableItem as HTMLElement).ondragstart = () => false;
		}
	}, []);

	return (
		<div
			className={cn(styles.wrapper, DND_PROVIDER_CLASS, uniqueDndProviderClassName)}
			data-save-position-after-drop={withSavingPositionAfterDrop ? true : undefined}>
			{children}
		</div>
	);
}

export default DndProvider;
