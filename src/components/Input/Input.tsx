import React, { ChangeEventHandler, useId } from 'react';

import styles from './Input.module.css';
import { DEFAULT_INPUT_PLACEHOLDER } from '@model/constants.ts';
import { InputProps } from './Input.interface.ts';
import { cn } from '@helpers/cn.ts';
import { Icons } from '@assets/icons/index.ts';

function Input({
	value,
	onChange,
	type = 'text',
	size = 'medium',
	disabled,
	placeholder,
	label,
	withIcon = false,
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

				<div className={cn(styles.input_wrapper, styles[`${size}`], className)} style={style}>
					{withIcon && <Icons.Search />}
					<input
						type={type}
						value={value}
						onChange={onChangeHandler}
						id={uniqueId}
						name={`input-${uniqueId}`}
						placeholder={placeholder || DEFAULT_INPUT_PLACEHOLDER}
						disabled={disabled}
						className={styles.input}
						{...customProps}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={cn(styles.input_wrapper, styles[`${size}`], className)} style={style}>
			{withIcon && <Icons.Search />}
			<input
				type={type}
				value={value}
				onChange={onChangeHandler}
				id={uniqueId}
				name={`input-${uniqueId}`}
				placeholder={placeholder || DEFAULT_INPUT_PLACEHOLDER}
				className={styles.input}
				disabled={disabled}
			/>
		</div>
	);
}

export default Input;
