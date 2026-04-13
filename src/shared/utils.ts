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

export function computeRangeFromParts(partA: BasePart, partB: BasePart): number {
	return math.abs(partA.Position.sub(partB.Position).Magnitude);
}

export function computeRangeFromVec3(posA: Vector3, posB: Vector3) {
	return math.abs(posA.sub(posB).Magnitude);
}
