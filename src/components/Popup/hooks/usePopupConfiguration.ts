import { MutableRefObject, useRef } from 'react';
import { DEFAULT_POPUP_WINDOW_PADDING_IN_PX } from '../data/constants';

interface IsPreferredPositionCanBeSavedParams {
	popupWrapperRef: MutableRefObject<HTMLDivElement | null>;
	preferredPosition: 'top' | 'bottom' | 'left' | 'right';

	contentWidth: number;
	contentHeight: number;
	contentGap: number;
}

function getPopupPosition({
	popupWrapperRef,
	preferredPosition,
	contentHeight,
	contentWidth,
	contentGap
}: IsPreferredPositionCanBeSavedParams) {
	if (!popupWrapperRef.current) return;

	const popupWrapperRect = popupWrapperRef.current.getBoundingClientRect();

	const windowHeight = window.innerHeight,
		windowWidth = window.innerWidth;

	switch (preferredPosition) {
		case 'top': {
			if (popupWrapperRect.top - contentGap - contentHeight >= DEFAULT_POPUP_WINDOW_PADDING_IN_PX) return 'top';
			return 'bottom';
		}

		case 'bottom': {
			if (popupWrapperRect.bottom + contentGap + contentHeight <= windowHeight - DEFAULT_POPUP_WINDOW_PADDING_IN_PX)
				return 'bottom';
			return 'top';
		}

		case 'left': {
			if (popupWrapperRect.left - contentGap - contentWidth >= DEFAULT_POPUP_WINDOW_PADDING_IN_PX) return 'left';
			return 'right';
		}

		case 'right': {
			if (popupWrapperRect.right + contentGap + contentWidth <= windowWidth - DEFAULT_POPUP_WINDOW_PADDING_IN_PX)
				return 'right';
			return 'left';
		}
	}
}

interface UsePopupConfigurationParams {
	preferredPosition: 'top' | 'bottom' | 'left' | 'right';
	contentWidth: number | 'useParentNodeWidth';
	contentHeight: number | 'useParentNodeHeight';
	contentGap: number;
}

export function usePopupConfiguration({
	preferredPosition,
	contentHeight,
	contentWidth,
	contentGap
}: UsePopupConfigurationParams) {
	const popupWrapperRef = useRef<HTMLDivElement | null>(null);
	const contentCoordinates = {
		x: 0,
		y: 0
	};

	const CONTENT_HEIGHT =
		contentHeight === 'useParentNodeHeight' ? popupWrapperRef.current?.offsetHeight || 0 : contentHeight;
	const CONTENT_WIDTH =
		contentWidth === 'useParentNodeWidth' ? popupWrapperRef.current?.offsetWidth || 0 : contentWidth;

	const calculatedPosition = getPopupPosition({
		popupWrapperRef,
		preferredPosition,
		contentHeight: CONTENT_HEIGHT,
		contentWidth: CONTENT_WIDTH,
		contentGap
	});

	if (popupWrapperRef.current === null || calculatedPosition === undefined) {
		return {
			popupWrapperRef,
			contentCoordinates
		};
	}

	const popupWrapperRect = popupWrapperRef.current.getBoundingClientRect();

	switch (calculatedPosition) {
		case 'top': {
			contentCoordinates.x = popupWrapperRect.left;
			contentCoordinates.y = popupWrapperRect.top - contentGap - CONTENT_HEIGHT;
			break;
		}

		case 'bottom': {
			contentCoordinates.x = popupWrapperRect.left;
			contentCoordinates.y = popupWrapperRect.bottom + contentGap;
			break;
		}

		case 'left': {
			contentCoordinates.x = popupWrapperRect.left - contentGap - CONTENT_WIDTH;
			contentCoordinates.y = popupWrapperRect.top;
			break;
		}

		case 'right': {
			contentCoordinates.x = popupWrapperRect.right + contentGap;
			contentCoordinates.y = popupWrapperRect.top;
			break;
		}
	}

	return {
		popupWrapperRef,
		contentCoordinates
	};
}
