import { Events } from "server/network";

export class ReplicatedDataServer<T> {
	private data: T | undefined;

	constructor(private targetPlayer: Player, private id: string, initData?: T) {
		this.data = initData;

		Events.replicatedData.fire(targetPlayer, id, initData);
	}

	public set(data: T) {
		this.data = data;
		Events.replicatedData.fire(this.targetPlayer, this.id, data);
	}

	public get() {
		return this.data;
	}
}
