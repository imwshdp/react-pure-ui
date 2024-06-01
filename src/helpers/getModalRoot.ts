export function getModalRoot() {
	// TODO: move to constants
	let modalRoot = document.getElementById('modal-root');

	if (!modalRoot) {
		const newModalRoot = document.createElement('div');
		newModalRoot.id = 'modal-root';
		document.body.appendChild(newModalRoot);
		modalRoot = document.getElementById('modal-root')!;
	}

	return modalRoot;
}
