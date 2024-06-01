import React, { MouseEventHandler } from 'react';

import { ButtonProps } from './Button.interface.ts';
import styles from './Button.module.css';
import { cn } from '@helpers/cn.ts';

function Button({ children, size = 'medium', disabled, onClick, className, style, customProps }: ButtonProps) {
	const onClickHandler: MouseEventHandler<HTMLButtonElement> = event => {
		if (customProps?.onClick) {
			customProps.onClick(event);
		} else {
			onClick && onClick();
		}
	};

	return (
		<button
			onClick={onClickHandler}
			disabled={disabled}
			className={cn(styles.button, styles[`${size}`], className)}
			style={style}
			{...customProps}>
			{children}
		</button>
	);
}

export default Button;
