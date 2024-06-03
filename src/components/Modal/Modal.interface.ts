import { ReactNode } from 'react';

export interface ModalProps {
	isOpen: boolean;
	closeModal: () => void;

	modalContent: ReactNode;
	headerContent?: ReactNode;
}
