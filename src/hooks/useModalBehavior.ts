import { MouseEvent, MutableRefObject, useState } from 'react';

import useWindowListener from './useWindowListener';
import { findInParentNodes } from '@helpers/findInParentNodes';

export function useModalBehavior<T>({
	closeModal,
	modalRef
}: {
	closeModal: () => void;
	modalRef: MutableRefObject<T | null>;
}) {
	const [isMouseDownOnContent, setIsMouseDownOnContent] = useState<boolean>(false);

	const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();

		if (
			closeModal &&
			!findInParentNodes({
				node: event.target as Node,
				targetNode: modalRef.current as Node
			})
		) {
			!isMouseDownOnContent && closeModal();
			setIsMouseDownOnContent(false);
		}
	};

	const onMouseDownHandler = () => setIsMouseDownOnContent(true);
	const onMouseUpHandler = () => setIsMouseDownOnContent(false);

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.code) {
			case 'Escape': {
				closeModal();
			}
		}
	};

	useWindowListener('keydown', handleKeyDown);

	return {
		onClickHandler,
		onMouseDownHandler,
		onMouseUpHandler
	};
}
