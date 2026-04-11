import { Players, ReplicatedStorage } from "@rbxts/services";

export namespace Assets {
	type assetNamespace = "Items";
	type UINamespaces = "Tooltips";

	export function getAsset(namespace: assetNamespace, name: string): Instance | undefined {
		return ReplicatedStorage.FindFirstChild("Assets")?.FindFirstChild(namespace)?.FindFirstChild(name);
	}

	export function getUI(namespace: UINamespaces, name: string): Frame | undefined {
		return Players.LocalPlayer.WaitForChild("PlayerGui")
			.FindFirstChild("Interface")
			?.FindFirstChild(namespace)
			?.FindFirstChild(name) as Frame;
	}
}
