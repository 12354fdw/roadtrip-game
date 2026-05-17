import { Players, ReplicatedStorage } from "@rbxts/services";

export namespace Assets {
	type assetNamespace = "Items";
	type UINamespaces = "Tooltips";

	export function getAsset(namespace: assetNamespace, name: string): Instance {
		return ReplicatedStorage.WaitForChild("Assets").WaitForChild(namespace).WaitForChild(name).Clone();
	}

	export function getPlaceable(name: string, stage: string): Model {
		return ReplicatedStorage.WaitForChild("Assets")
			.WaitForChild("Placeables")
			.WaitForChild(name)
			.WaitForChild(stage)
			.Clone() as Model;
	}

	export function getUI(namespace: UINamespaces, name: string): Frame | undefined {
		return Players.LocalPlayer.WaitForChild("PlayerGui")
			.FindFirstChild("Interface")
			?.FindFirstChild(namespace)
			?.FindFirstChild(name) as Frame;
	}
}
