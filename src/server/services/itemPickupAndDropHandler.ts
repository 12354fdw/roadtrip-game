import { OnStart, Service } from "@flamework/core";
import { PlayerService } from "./playerService";
import { Events } from "server/network";
import { dropItem, pickupItem } from "shared/networkTypes";
import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";
import { PlayerHands } from "shared/types/playerData";
import { ItemManager } from "./ItemManager";
import { PhysicalItemManager } from "./physicalItemManager";

@Service()
export class ItemPickupAndDropHandler implements OnStart {
	constructor(
		private readonly playerService: PlayerService,
		private readonly itemManager: ItemManager,
		private readonly physicalItemManager: PhysicalItemManager,
	) {}

	onStart(): void {
		Events.pickupItem.connect((player: Player, event: pickupItem) => {
			const playerData = this.playerService.getPlayerData(player)!;

			const item = this.itemManager.get(event.id);
			if (!item) return;

			if (!this.canPickup(item, playerData.hands)) return;

			if (item.holdType === "TwoHanded") {
				playerData.hands.left = item;
				playerData.hands.right = item;
				this.physicalItemManager.equip(item, player.Character!, "Both");
			} else {
				if (playerData.hands.right === undefined) {
					playerData.hands.right = item;
					this.physicalItemManager.equip(item, player.Character!, "Right");
				} else {
					playerData.hands.left = item;
					this.physicalItemManager.equip(item, player.Character!, "Left");
				}
			}
		});

		Events.dropItem.connect((player: Player, event: dropItem) => {
			// TODO: impl this
		});
	}

	private canPickup(item: BaseItem, hands: PlayerHands): boolean {
		if (item.holdType === "TwoHanded") {
			return hands.left === undefined;
		}

		return hands.left === undefined || hands.right === undefined;
	}
}
