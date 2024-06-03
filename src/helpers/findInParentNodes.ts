export function findInParentNodes({ node, targetNode }: { node: Node; targetNode: Node }): boolean {
	let currentNode: Node | null = node;

	while (currentNode !== null) {
		if (currentNode === targetNode) {
			return true;
		}
		currentNode = currentNode.parentNode;
	}

	return false;
}
