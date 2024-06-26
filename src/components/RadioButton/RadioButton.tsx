import React, { ChangeEventHandler, useId } from 'react';

import { RadioButtonProps } from './RadioButton.interface.ts';
import styles from './RadioButton.module.css';
import { cn } from '../../helpers/cn.ts';

function RadioButton({
	checked,
	name,
	onChange,
	disabled = false,
	label,
	value,
	className,
	style,
	customProps
}: RadioButtonProps) {
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
				type='radio'
				disabled={disabled}
				id={uniqueId}
				value={value}
				onChange={onChangeHandler}
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
