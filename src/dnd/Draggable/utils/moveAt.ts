interface MoveAtParams {
	draggableItem: HTMLElement;
	pageX: number;
	pageY: number;
}

export function moveAt({ draggableItem, pageX, pageY }: MoveAtParams) {
	draggableItem.style.left = pageX + 'px';
	draggableItem.style.top = pageY + 'px';
}
