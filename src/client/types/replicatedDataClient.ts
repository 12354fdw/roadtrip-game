import { Events } from "client/network";

export class ReplicatedDataClient<T> {
	private data: T | undefined;
	private listeners: Set<(data: T) => void> = new Set();
	private disconnect: () => void;

	constructor(private id: string) {
		const connection = Events.replicatedData.connect((incomingId: string, recvData: unknown) => {
			if (incomingId !== this.id) return;
			const data = recvData as T;
			this.data = data;
			this.listeners.forEach((cb) => cb(data));
		});

		this.disconnect = () => connection.Disconnect();

		Events.requestReplicatedData(id);
	}

	public get(): T | undefined {
		return this.data;
	}

	public onChange(cb: (data: T) => void): () => void {
		this.listeners.add(cb);
		return () => this.listeners.delete(cb);
	}

	public waitForData(): Promise<T> {
		if (this.data !== undefined) return Promise.resolve(this.data);
		return new Promise((resolve) => {
			const unsub = this.onChange((data) => {
				unsub();
				resolve(data);
			});
		});
	}

	public destroy(): void {
		this.disconnect();
		this.listeners.clear();
	}
}
