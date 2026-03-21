import { ReplicatedStorage } from "@rbxts/services";

export namespace AssetsManager {
	const assetPrefix = ReplicatedStorage.FindFirstChild("Assets");

	export function getTile(name: string): Model {
		const tile = assetPrefix?.FindFirstChild("Tiles")?.FindFirstChild(name) as Model;
		if (!tile) {
			error("ohno");
		}
		return tile;
	}
}
