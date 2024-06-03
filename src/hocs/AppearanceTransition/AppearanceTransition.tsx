import React, { useEffect, useState } from 'react';

import { AppearanceTransitionProps } from './AppearanceTransition.interface.ts';
import styles from './AppearanceTransition.module.css';
// import { cn } from '@helpers/cn.ts';

function AppearanceTransition({ children, isRendering, transitionTimeInSec }: AppearanceTransitionProps) {
	const [opacity, setOpacity] = useState(0);
	const [shouldRenderChildren, setShouldRenderChildren] = useState(() => isRendering);

	useEffect(() => {
		if (isRendering) {
			setOpacity(1);
			setShouldRenderChildren(true);
		} else {
			setOpacity(0);
			setTimeout(
				() => {
					setShouldRenderChildren(false);
				},
				transitionTimeInSec ? transitionTimeInSec * 1000 : 400
			);
		}
	}, [isRendering]);

	return (
		<div
			className={styles.wrapper}
			style={{ opacity, transition: transitionTimeInSec ? `opacity ${transitionTimeInSec}s` : undefined }}>
			{shouldRenderChildren && children}
		</div>
	);
}

export default AppearanceTransition;
