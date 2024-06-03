import React, { useRef } from 'react';

import { ModalProps } from './Modal.interface.ts';
import styles from './Modal.module.css';
import { getModalRoot } from '@helpers/getModalRoot.ts';
import { createPortal } from 'react-dom';
import { useModalBehavior } from '@hooks/useModalBehavior.ts';
import { cn } from '@helpers/cn.ts';
import AppearanceTransition from '@hocs/AppearanceTransition';

function Modal({ isOpen, closeModal, modalContent, headerContent }: ModalProps) {
	const modalContentRef = useRef<HTMLElement | null>(null);
	const modalRoot = getModalRoot();

	const { onClickHandler, onMouseDownHandler, onMouseUpHandler } = useModalBehavior({
		closeModal,
		modalRef: modalContentRef
	});

	const modal = (
		<div className={styles.container} onClick={onClickHandler}>
			<section
				className={styles.wrapper}
				ref={modalContentRef}
				onMouseDown={onMouseDownHandler}
				onMouseUp={onMouseUpHandler}>
				{headerContent && <header className={styles.header}>{headerContent}</header>}
				<div className={cn(styles.body, !headerContent ? styles.headless : undefined)}>{modalContent}</div>
			</section>
		</div>
	);

	return createPortal(<AppearanceTransition children={modal} isRendering={isOpen} />, modalRoot);
}

export default Modal;
