import { DEFAULT_MODAL_ROOT_ID } from '@model/constants';

export function getModalRoot() {
	let modalRoot = document.getElementById(DEFAULT_MODAL_ROOT_ID);

	if (!modalRoot) {
		const newModalRoot = document.createElement('div');
		newModalRoot.id = DEFAULT_MODAL_ROOT_ID;
		newModalRoot.style.position = 'absolute';
		newModalRoot.style.top = '0';
		newModalRoot.style.left = '0';

		document.body.appendChild(newModalRoot);
		modalRoot = document.getElementById(DEFAULT_MODAL_ROOT_ID)!;
	}

	return modalRoot;
}
