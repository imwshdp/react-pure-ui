import { MutableRefObject, useEffect } from 'react';

interface UseOutsideClickParams<T> {
	elementRef: MutableRefObject<T> | Array<MutableRefObject<T>>;
	outsideClickFunction: () => void;
}

export function useOutsideClick<T>({ elementRef, outsideClickFunction }: UseOutsideClickParams<T>) {
	const isMultiRef = Array.isArray(elementRef);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			let target = event.target as Node | null;

			while (target) {
				if (isMultiRef ? elementRef.find(ref => target === ref.current) : target === elementRef.current) {
					return;
				}
				target = target.parentNode;
			}

			outsideClickFunction();
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);
}
