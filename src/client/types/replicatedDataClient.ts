import { Events } from "client/network";

export class ReplicatedDataClient<T> {
	private data: T | undefined;
	private listeners: ((data: T) => void)[] = [];

	constructor(private id: string) {
		Events.replicatedData.connect((id: string, recvData: unknown) => {
			if (id !== this.id) return;

			const data = recvData as T;
			this.data = data;

			this.listeners.forEach((cb) => cb(this.data as T));
		});
	}

	public get() {
		return this.data;
	}

	public onChange(cb: (data: T) => void) {
		this.listeners.push(cb);
	}
}
