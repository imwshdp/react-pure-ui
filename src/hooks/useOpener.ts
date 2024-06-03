import { useEffect, useRef, useState } from 'react';

export function useOpener<T extends HTMLElement, T2 extends HTMLElement>() {
	const openerRef = useRef<T | null>(null);
	const contentRef = useRef<T2 | null>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen);

	useEffect(() => {
		openerRef.current?.addEventListener('click', toggleIsOpen);

		return () => {
			openerRef.current?.removeEventListener('click', toggleIsOpen);
		};
	}, [openerRef]);

	return { isOpen, openerRef, contentRef, toggleIsOpen };
}
