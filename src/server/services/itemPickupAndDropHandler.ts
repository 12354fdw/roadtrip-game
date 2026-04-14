import { OnStart, Service } from "@flamework/core";
import { PlayerService } from "./playerService";
import { Events, Functions } from "server/network";
import { canPickupItem_REQUEST, dropItem, pickupItem } from "shared/networkTypes";
import { BaseItem } from "shared/Items/types/baseItem";
import { PlayerHands } from "shared/types/playerData";
import { ItemManager } from "./ItemManager";
import { PhysicalItemManager } from "./physicalItemManager";
import { computeRangeFromParts, computeRangeFromVec3 } from "shared/utils";

const ITEM_RANGE = 10;

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

			if (!this.canPickup(item, playerData.hands, player.Character!)) return;
			if (item.model.GetAttribute("canPickup") === false) return;

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
			item.model.SetAttribute("canPickup", false);
		});

		Events.dropItem.connect((player: Player, event: dropItem) => {
			const playerData = this.playerService.getPlayerData(player)!;
			const position = event.position;

			const isInRange =
				computeRangeFromVec3(
					(player.Character?.WaitForChild("HumanoidRootPart") as BasePart).Position,
					position.Position,
				) <= ITEM_RANGE;

			if (!isInRange) return;

			if (playerData.hands.left && playerData.hands.left.holdType === "TwoHanded") {
				this.physicalItemManager.drop(playerData.hands.left, position);
				playerData.hands.left = undefined;
				playerData.hands.right = undefined;
				return;
			}

			if (playerData.hands.right) {
				this.physicalItemManager.drop(playerData.hands.right, position);
				playerData.hands.right = undefined;
				return;
			}

			if (playerData.hands.left) {
				this.physicalItemManager.drop(playerData.hands.left, position);
				playerData.hands.left = undefined;
				return;
			}
		});

		Functions.checkCanPickupItem.setCallback((player: Player, request: canPickupItem_REQUEST) => {
			const hands = this.playerService.getPlayerData(player)?.hands;
			const item = this.itemManager.get(request.itemId);

			if (!item || !hands) return false;

			return this.canPickup(item, hands, player.Character!);
		});
	}

	private canPickup(item: BaseItem, hands: PlayerHands, character: Model): boolean {
		const inRange =
			computeRangeFromParts(
				character.WaitForChild("HumanoidRootPart") as BasePart,
				item.model.WaitForChild("Handle") as BasePart,
			) <= ITEM_RANGE;

		if (item.holdType === "TwoHanded") {
			return hands.left === undefined && hands.right === undefined && inRange;
		}

		return (hands.left === undefined || hands.right === undefined) && inRange;
	}
}
