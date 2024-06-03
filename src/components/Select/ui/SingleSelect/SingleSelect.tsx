import React, { forwardRef, useRef } from 'react';

import { SingleSelectProps } from './SingleSelect.interface.ts';
import styles from '../../Select.module.css';

import { cn } from '@helpers/cn.ts';
import type { ExtendedSelectProps } from '@components/Select/Select.interface.ts';
import Popup from '@components/Popup';
import { Icons } from '@assets/icons/index.ts';

const SingleSelect = forwardRef<HTMLElement | HTMLDivElement | null, SingleSelectProps & ExtendedSelectProps>(
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
							className={cn(styles.option, value?.value === option.value ? styles.selected : undefined)}
							onClick={() => onChange(option)}>
							{option.label}
						</li>
					);
				})}
			</ul>
		);

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
								{value && <span>{value.label}</span>}

								<div className={styles.divider} />

								<button
									ref={selectButtonRef}
									className={cn(styles.toggle, isOpen ? styles.toggled : undefined)}
									onClick={toggleOptions}>
									<Icons.Arrow />
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
					{value && <span>{value.label}</span>}

					<div className={styles.divider} />

					<button className={cn(styles.toggle, isOpen ? styles.toggled : undefined)} onClick={toggleOptions}>
						<Icons.Arrow />
					</button>
				</div>

				{isOpen && renderOptionsList()}
			</section>
		);
	}
);

export default SingleSelect;
