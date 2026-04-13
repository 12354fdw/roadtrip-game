export interface requestReplicatedData {
	id: string;
}

export interface replicatedData {
	id: string;
	data: unknown;
}

export interface pickupItem {
	id: number;
}

export interface dropItem {
	position: Vector3;
}
