import React, { useRef, useState } from 'react';

import { SelectProps } from './Select.interface.ts';
import SingleSelect from './ui/SingleSelect/SingleSelect';
import { useOutsideClick } from '@hooks/useOutsideClick.ts';
import MultiSelect from './ui/MultiSelect';
import { getModalRoot } from '@helpers/getModalRoot.ts';

function Select(props: SelectProps) {
	const modalRoot = getModalRoot();
	const modalRootRef = useRef(modalRoot);

	const selectRef = useRef<HTMLElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleOptions = () => setIsOpen(previousSetIsOpen => !previousSetIsOpen);
	const closeOptions = () => setIsOpen(false);

	useOutsideClick({
		elementRef: props.renderWithPortal ? [modalRootRef, selectRef] : selectRef,
		outsideClickFunction: props.closeOnOutsideClick ? closeOptions : () => {}
	});

	if (props.type === 'multi') {
		return <MultiSelect ref={selectRef} {...props} isOpen={isOpen} toggleOptions={toggleOptions} />;
	} else {
		return <SingleSelect ref={selectRef} {...props} isOpen={isOpen} toggleOptions={toggleOptions} />;
	}
}

export default Select;
