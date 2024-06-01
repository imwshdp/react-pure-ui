import React, { forwardRef, useRef } from 'react';

import { MultiSelectProps } from './MultiSelect.interface.ts';
import styles from '../../Select.module.css';

import { ArrowDownIcon } from '@assets/icons/ArrowDownIcon.tsx';
import { cn } from '@helpers/cn.ts';
import { ExtendedSelectProps, MultiSelectOptionType } from '@components/Select/Select.interface.ts';
import Popup from '@components/Popup';

const MultiSelect = forwardRef<HTMLElement | null, MultiSelectProps & ExtendedSelectProps>(
	(
		{
			value,
			onChange,
			options,
			size = 'medium',
			renderWithPortal,
			customOptionsListHeight,
			className,
			style,
			isOpen,
			toggleOptions
		},
		selectRef
	) => {
		const selectButtonRef = useRef<HTMLButtonElement | null>(null);

		const onChangeValueHandler = (chosenOption: MultiSelectOptionType) => {
			const foundedIndex = value.findIndex(valueItem => valueItem.value === chosenOption.value);

			if (foundedIndex !== -1) {
				return value.filter(option => option.value !== chosenOption.value);
			} else {
				return [...value, chosenOption];
			}
		};

		const renderOptionsList = () => (
			<ul
				className={styles.list}
				style={{
					maxHeight: customOptionsListHeight
				}}>
				{options.map((option, optionIndex) => {
					return (
						<li
							key={`option-${optionIndex}`}
							className={cn(
								styles.option,
								value.find(valueItem => valueItem.value === option.value) ? styles.selected : undefined
							)}
							onClick={() => onChange(onChangeValueHandler(option))}>
							{option.label}
						</li>
					);
				})}
			</ul>
		);

		const renderLabels = () =>
			value.map((valueItem, index) => {
				return <li key={`label-${index}`}>{valueItem.label}</li>;
			});

		if (renderWithPortal) {
			return (
				<section className={styles.wrapper} style={style} ref={selectRef}>
					<Popup
						openBy='click'
						preferredPosition='bottom'
						popupNodeGap={0}
						config={{
							useParentNodeWidth: true,
							customToggleNodeRef: selectButtonRef,
							customIsOpen: isOpen
						}}
						parentNode={
							<div className={cn(styles.select, styles[`${size}`], className)}>
								{value && value.length > 0 && <ul className={styles.values}>{renderLabels()}</ul>}

								<div className={styles.divider} />

								<button
									ref={selectButtonRef}
									className={cn(styles.toggle, isOpen ? styles.toggled : undefined)}
									onClick={toggleOptions}>
									<ArrowDownIcon />
								</button>
							</div>
						}
						popupNode={<>{isOpen && renderOptionsList()}</>}
					/>
				</section>
			);
		}

		return (
			<section className={styles.wrapper} style={style} ref={selectRef}>
				<div className={cn(styles.select, styles[`${size}`], className)}>
					{value && value.length > 0 && <ul className={styles.values}>{renderLabels()}</ul>}

					<div className={styles.divider} />

					<button className={cn(styles.toggle, isOpen ? styles.toggled : undefined)} onClick={toggleOptions}>
						<ArrowDownIcon />
					</button>
				</div>

				{isOpen && renderOptionsList()}
			</section>
		);
	}
);

export default MultiSelect;
