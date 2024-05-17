import { REACT_ROOT_CONTAINER_ID } from '../../../model/dnd';

interface MoveToDroppableControllerParams {
	droppable: HTMLElement;
	draggable: HTMLElement;
	offsetLeft: number;
	offsetTop: number;
}

function moveToDroppableController({ draggable, droppable, offsetLeft, offsetTop }: MoveToDroppableControllerParams) {
	const root = document.getElementById(REACT_ROOT_CONTAINER_ID);
	if (!root) return;

	root.removeChild(draggable);
	droppable.append(draggable);

	draggable.style.left = `${offsetLeft}px`;
	draggable.style.top = `${offsetTop}px`;
	draggable.style.zIndex = '0';
}

interface EnterDroppableParams {
	droppable: HTMLElement;
	draggable: HTMLElement;
	withSavingPosition: boolean;
}

export function enterDroppable({ draggable, droppable, withSavingPosition }: EnterDroppableParams) {
	if (withSavingPosition) {
		const newOffsetLeft = draggable.offsetLeft - droppable.offsetLeft;
		const newOffsetTop = draggable.offsetTop - droppable.offsetTop;

		moveToDroppableController({
			draggable,
			droppable,
			offsetLeft: newOffsetLeft,
			offsetTop: newOffsetTop
		});
	} else {
		moveToDroppableController({
			draggable,
			droppable,
			offsetLeft: 0,
			offsetTop: 0
		});
		draggable.style.position = 'static';
	}

	draggable.style.zIndex = '0';
}

interface BackToInitialDroppableParams {
	droppable: HTMLElement;
	draggable: HTMLElement;
	withSavingPosition: boolean;
	initialDraggableOffset: {
		left: number;
		top: number;
	};
}

export function backToInitialDroppable({
	draggable,
	droppable,
	withSavingPosition,
	initialDraggableOffset
}: BackToInitialDroppableParams) {
	if (withSavingPosition) {
		const oldOffsetLeft = initialDraggableOffset.left;
		const oldOffsetTop = initialDraggableOffset.top;

		moveToDroppableController({
			draggable,
			droppable,
			offsetLeft: oldOffsetLeft,
			offsetTop: oldOffsetTop
		});
	} else {
		moveToDroppableController({
			draggable,
			droppable,
			offsetLeft: 0,
			offsetTop: 0
		});
		draggable.style.position = 'static';
	}

	draggable.style.zIndex = '0';
}
