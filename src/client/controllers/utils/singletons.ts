import { Controller } from "@flamework/core";
import { Players } from "@rbxts/services";

@Controller()
export class ClientSingletons {
	public readonly localPlayer = Players.LocalPlayer;
}
