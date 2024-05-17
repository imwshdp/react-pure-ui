import React, { ChangeEventHandler, useId } from 'react';

import styles from './Input.module.css';
import { DEFAULT_INPUT_PLACEHOLDER } from '../../model/constants.ts';
import { InputProps } from './Input.interface';
import { cn } from '../../helpers/cn.ts';

function Input({
	value,
	onChange,
	type = 'text',
	size = 'medium',
	disabled,
	placeholder,
	label,
	className,
	style,
	customProps
}: InputProps) {
	const uniqueId = useId();

	const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
		if (customProps?.onChange) {
			customProps.onChange(event);
		} else {
			onChange(event.target.value);
		}
	};

	if (label) {
		return (
			<div className={styles.wrapper}>
				{label && (
					<label htmlFor={`input-${uniqueId}`} className={styles.label}>
						{label}
					</label>
				)}

				<input
					type={type}
					value={value}
					onChange={onChangeHandler}
					id={uniqueId}
					name={`input-${uniqueId}`}
					placeholder={placeholder || DEFAULT_INPUT_PLACEHOLDER}
					disabled={disabled}
					className={cn(styles.input, styles[`${size}`], className)}
					style={style}
					{...customProps}
				/>
			</div>
		);
	}

	return (
		<input
			type={type}
			value={value}
			onChange={onChangeHandler}
			id={uniqueId}
			name={`input-${uniqueId}`}
			placeholder={placeholder || DEFAULT_INPUT_PLACEHOLDER}
			disabled={disabled}
			className={cn(styles.input, styles[`${size}`], className)}
			style={style}
		/>
	);
}

export default Input;
