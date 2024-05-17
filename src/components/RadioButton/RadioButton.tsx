import React, { useId } from 'react';

import { RadioButtonProps } from './RadioButton.interface.js';
import styles from './RadioButton.module.css';
import { cn } from '../../helpers/cn.ts';

function RadioButton({ checked, name, onChange, disabled = false, label, value, className, style }: RadioButtonProps) {
	const uniqueId = useId();

	return (
		<div className={cn(styles.wrapper, className)} style={style}>
			<input
				type='radio'
				disabled={disabled}
				id={uniqueId}
				value={value}
				onChange={onChange}
				checked={checked}
				name={name}
				className={styles.button}
			/>
			<label htmlFor={uniqueId} className={cn(styles.label)}>
				{label}
			</label>
		</div>
	);
}

export default RadioButton;
