import React, { useRef } from 'react';

import { PopupProps } from './Popup.interface';
import styles from './Popup.module.css';
import { cn } from '@helpers/cn';
import { usePopupConfiguration } from './hooks/usePopupConfiguration';
import Portal from '@components/Portal';
import { DEFAULT_POPUP_GAP_IN_PX } from './data/constants';
import { usePopupOpener } from './hooks/usePopupOpener';

function Popup({
	parentNode,
	popupNode,
	preferredPosition = 'top',
	openBy,
	popupNodeGap = DEFAULT_POPUP_GAP_IN_PX,
	config,
	className,
	style
}: PopupProps) {
	const contentRef = useRef<HTMLDivElement | null>(null);

	const popupNodeCoords = contentRef.current?.getBoundingClientRect();

	const { contentCoordinates, popupWrapperRef } = usePopupConfiguration({
		preferredPosition,
		contentHeight: config?.useParentNodeHeight ? 'useParentNodeHeight' : popupNodeCoords?.height || 0,
		contentWidth: config?.useParentNodeWidth ? 'useParentNodeWidth' : popupNodeCoords?.width || 0,
		contentGap: popupNodeGap
	});

	const { isOpen } = usePopupOpener({
		openBy,
		popupWrapperRef: config?.customToggleNodeRef || popupWrapperRef,
		customIsOpen: config?.customIsOpen
	});

	return (
		<div ref={popupWrapperRef} className={cn(styles.popup, className)} style={style}>
			{parentNode}
			<Portal
				portalContent={
					<div
						ref={contentRef}
						className={cn(isOpen ? styles.open : styles.closed)}
						style={{
							position: 'fixed',
							left: contentCoordinates.x,
							top: contentCoordinates.y,
							height: config?.useParentNodeHeight ? popupWrapperRef.current?.offsetHeight : 'auto',
							width: config?.useParentNodeWidth ? popupWrapperRef.current?.offsetWidth : 'auto'
						}}>
						{popupNode}
					</div>
				}
			/>
		</div>
	);
}

export default Popup;
