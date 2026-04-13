import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { ItemHoverDetection } from "./itemHoverDetection";
import { Events } from "client/network";
import { ClientSingletons } from "./utils/singletons";

@Controller({})
export class ItemPickupAndDrop implements OnStart {
	constructor(
		private readonly itemHoverDetection: ItemHoverDetection,
		private readonly singletons: ClientSingletons,
	) {}

	onStart() {
		UserInputService.InputBegan.Connect((input: InputObject, gameProcessed: boolean) => {
			if (gameProcessed) return;

			if (input.KeyCode !== Enum.KeyCode.F) return;

			const itemInstance = this.itemHoverDetection.itemInstance;

			if (itemInstance) {
				Events.pickupItem.fire({ id: itemInstance.id });
			} else {
				Events.dropItem.fire({
					position: this.singletons.localPlayer.GetMouse().Hit,
				});
			}
		});
	}
}
