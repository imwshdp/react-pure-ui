import React from 'react';

import { ButtonProps } from './Button.interface.js';
import styles from './Button.module.css';
import { cn } from '../../helpers/cn.ts';

function Button({ children, size = 'medium', disabled, className, style, customProps }: ButtonProps) {
	return (
		<button
			className={cn(styles.button, styles[`${size}`], className)}
			style={style}
			disabled={disabled}
			{...customProps}>
			{children}
		</button>
	);
}

export default Button;
