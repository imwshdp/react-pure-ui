import React from 'react';

import { DroppableProps } from './Droppable.interface.ts';
import styles from './Droppable.module.css';
import { DND_DROPPABLE_CLASS } from '@model/dnd.ts';
import { cn } from '@helpers/cn.ts';

function Droppable({ children, className, customProps, style }: DroppableProps) {
	return (
		<section className={cn(styles.wrapper, DND_DROPPABLE_CLASS, className)} style={style} {...customProps}>
			{children}
		</section>
	);
}

export default Droppable;
