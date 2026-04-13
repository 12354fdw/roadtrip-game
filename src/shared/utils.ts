export function findFirstAncestorOfTag(instance: Instance, tag: string): Instance | undefined {
	let current: Instance | undefined = instance.Parent;
	while (current !== undefined && !current.HasTag(tag)) {
		current = current.Parent;
	}
	return current;
}

export function iterateOnDescendants(instance: Instance, callback: (instance: Instance, index: number) => void) {
	instance.GetDescendants().forEach((v: Instance, i: number) => callback(v, i));
}
