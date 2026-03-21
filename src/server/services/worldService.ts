import { Service, OnStart } from "@flamework/core";
import { AssetsManager } from "shared/getAsset";

export class Chunk {
	private material: Enum.Material;
	//private color: Vector3;
	private instance?: Model;

	private readonly chunkX;
	private readonly chunkY;

	constructor(posX: number, posY: number) {
		this.material = Enum.Material.Grass;
		//this.color = Vector3(31,128,29);

		this.chunkX = posX;
		this.chunkY = posY;
	}
	public draw(): void {
		if (!this.instance) {
			this.instance = AssetsManager.getTile("GrassTile").Clone();
		}
	}
}

@Service({})
export class WorldService implements OnStart {
	public terrainChunks: Map<string, Chunk>;

	constructor() {
		this.terrainChunks = new Map<string, Chunk>();
	}

	onStart(): void {}
}
