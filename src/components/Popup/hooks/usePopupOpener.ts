import { MutableRefObject, useEffect, useState } from 'react';

export function usePopupOpener<T extends HTMLElement>({
	openBy,
	popupWrapperRef,
	customIsOpen
}: {
	openBy: 'click' | 'hover';
	popupWrapperRef: MutableRefObject<T | null>;
	customIsOpen?: boolean;
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen);

	useEffect(() => {
		if (customIsOpen) return;

		if (openBy === 'click') {
			popupWrapperRef.current?.addEventListener('click', toggleIsOpen);
		} else {
			popupWrapperRef.current?.addEventListener('mouseenter', toggleIsOpen);
			popupWrapperRef.current?.addEventListener('mouseleave', toggleIsOpen);
		}

		return () => {
			if (openBy === 'click') {
				popupWrapperRef.current?.removeEventListener('click', toggleIsOpen);
			} else {
				popupWrapperRef.current?.removeEventListener('mouseenter', toggleIsOpen);
				popupWrapperRef.current?.removeEventListener('mouseleave', toggleIsOpen);
			}
		};
	}, [popupWrapperRef]);

	return { isOpen: customIsOpen || isOpen };
}
