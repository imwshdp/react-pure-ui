import React, { MouseEventHandler, useState } from 'react';

import { DraggableProps } from './Draggable.interface.ts';
import styles from './Draggable.module.css';
import { cn } from '../../helpers/cn.ts';
import { moveAt } from './utils/moveAt.ts';
import {
	DND_DRAGGABLE_CLASS,
	DND_DRAGGABLE_Z_INDEX,
	DND_DROPPABLE_CLASS,
	DND_PROVIDER_CLASS,
	REACT_ROOT_CONTAINER_ID
} from '../../model/dnd.ts';
import { backToInitialDroppable, enterDroppable } from './utils/onmouseupUtils.ts';

function Draggable({ children, className, customProps, style }: DraggableProps) {
	const [isDragging, setIsDragging] = useState<boolean>(false);

	let dndProvider: HTMLElement | null = null;
	let initialDroppable: HTMLElement | null = null;
	const initialDraggableOffset = {
		left: 0,
		top: 0
	};

	const onMouseDownHandler: MouseEventHandler<HTMLElement> = event => {
		setIsDragging(true);

		// TODO: change REACT_ROOT_CONTAINER_ID for .env var
		const root = document.getElementById(REACT_ROOT_CONTAINER_ID);
		const draggableItem = event.currentTarget;

		if (!initialDroppable) {
			initialDroppable = draggableItem.closest(`.${DND_DROPPABLE_CLASS}`);
			initialDraggableOffset.left = draggableItem.offsetLeft;
			initialDraggableOffset.top = draggableItem.offsetTop;
		}

		if (!dndProvider) {
			dndProvider = draggableItem.closest(`.${DND_PROVIDER_CLASS}`);
		}

		if (!root || !initialDroppable || !dndProvider) {
			return;
		}

		let newDroppable: HTMLElement | null = null;
		const shiftX = event.clientX - draggableItem.getBoundingClientRect().left;
		const shiftY = event.clientY - draggableItem.getBoundingClientRect().top;

		draggableItem.style.position = 'absolute';
		draggableItem.style.zIndex = DND_DRAGGABLE_Z_INDEX;
		root.append(draggableItem);

		moveAt({
			draggableItem,
			pageX: event.pageX - shiftX,
			pageY: event.pageY - shiftY
		});

		const onMouseMoveHandler = (event: MouseEvent) => {
			moveAt({
				draggableItem,
				pageX: event.pageX - shiftX,
				pageY: event.pageY - shiftY
			});

			draggableItem.hidden = true;
			const elementBelow = document.elementFromPoint(event.clientX, event.clientY);
			draggableItem.hidden = false;

			const droppableBelow = elementBelow?.closest(`.${DND_DROPPABLE_CLASS}`);

			if (newDroppable != droppableBelow) {
				// droppable leaving side effects
				// if (newDroppable) {...}
				newDroppable = droppableBelow as HTMLElement;
				// droppable entering side effects
				// if (newDroppable) {...}
			}
		};

		const onMouseUpHandler = () => {
			setIsDragging(false);

			const withSavingPosition = !!dndProvider?.dataset.savePositionAfterDrop;

			if (newDroppable) {
				enterDroppable({
					draggable: draggableItem,
					droppable: newDroppable,
					withSavingPosition
				});
			} else {
				backToInitialDroppable({
					draggable: draggableItem,
					droppable: initialDroppable as HTMLElement,
					withSavingPosition,
					initialDraggableOffset
				});
			}

			initialDroppable = null;
			newDroppable = null;

			draggableItem.onmouseup = null;
			document.removeEventListener('mousemove', onMouseMoveHandler);
		};

		draggableItem.onmouseup = onMouseUpHandler;
		document.addEventListener('mousemove', onMouseMoveHandler);
	};

	return (
		<section
			onMouseDown={onMouseDownHandler}
			className={cn(styles.wrapper, DND_DRAGGABLE_CLASS, className)}
			style={{
				...style,
				cursor: isDragging ? 'grabbing' : 'grab'
			}}
			{...customProps}>
			{children}
		</section>
	);
}

export default Draggable;
