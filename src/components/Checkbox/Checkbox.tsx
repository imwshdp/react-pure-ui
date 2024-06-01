import React, { ChangeEventHandler, useId } from 'react';

import { CheckboxProps } from './Checkbox.interface.ts';
import styles from './Checkbox.module.css';
import { cn } from '@helpers/cn.ts';

function Checkbox({ onChange, value, name, checked, disabled, label, className, style, customProps }: CheckboxProps) {
	const uniqueId = useId();

	const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
		if (customProps?.onChange) {
			customProps.onChange(event);
		} else {
			onChange(event.target.value);
		}
	};

	return (
		<div className={cn(styles.wrapper, className)} style={style}>
			<input
				type='checkbox'
				disabled={disabled}
				id={uniqueId}
				value={value}
				onChange={onChangeHandler}
				checked={checked}
				name={name}
				className={styles.checkbox}
			/>
			<label htmlFor={uniqueId} className={cn(styles.label)}>
				{label}
			</label>
		</div>
	);
}

export default Checkbox;
