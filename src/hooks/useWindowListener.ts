import { useEffect } from 'react';

export default function useWindowListener<T extends keyof WindowEventMap>(
	event: T,
	listener: (event: WindowEventMap[T]) => void
) {
	useEffect(() => {
		window.addEventListener(event, listener);

		return () => {
			window.removeEventListener(event, listener);
		};
	});
}
