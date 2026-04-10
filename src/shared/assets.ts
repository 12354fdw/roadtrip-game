import { ReplicatedStorage } from "@rbxts/services";

export namespace Assets {
	type assetNamespace = "Items";

	export function getAsset(namespace: assetNamespace, name: string): Instance | undefined {
		return ReplicatedStorage.FindFirstChild("Assets")?.FindFirstChild(namespace)?.FindFirstChild(name);
	}
}
