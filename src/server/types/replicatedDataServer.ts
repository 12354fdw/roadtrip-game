import { Events } from "server/network";

export class ReplicatedDataServer<T> {
	private data: T | undefined;
	private listeners: Set<(data: T) => void> = new Set();

	constructor(private targetPlayer: Player | "everyone", private id: string, initData?: T) {
		this.data = initData;
		if (initData !== undefined) {
			this.fireData();
		}
	}

	private fireData() {
		if (this.targetPlayer !== "everyone") {
			Events.replicatedData.fire(this.targetPlayer, this.id, this.data);
		} else {
			Events.replicatedData.broadcast(this.id, this.data);
		}
	}

	public set(data: T): void {
		this.data = data;
		this.fireData();
		this.listeners.forEach((cb) => cb(data));
	}

	public get(): T | undefined {
		return this.data;
	}

	public onChange(cb: (data: T) => void): () => void {
		this.listeners.add(cb);
		return () => this.listeners.delete(cb);
	}

	public destroy(): void {
		this.listeners.clear();
	}
}
