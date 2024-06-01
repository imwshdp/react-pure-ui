import React from 'react';

import { PortalProps } from './Portal.interface.ts';

import { getModalRoot } from '@helpers/getModalRoot.ts';
import { createPortal } from 'react-dom';

function Portal({ portalContent }: PortalProps) {
	const modalRoot = getModalRoot();
	return createPortal(portalContent, modalRoot);
}

export default Portal;
