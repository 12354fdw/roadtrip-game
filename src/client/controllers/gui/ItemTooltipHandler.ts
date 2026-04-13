import { Controller, OnStart } from "@flamework/core";
import { BaseItem } from "shared/Items/ItemTypes/baseItem";
import { Assets } from "shared/assets";
import { TooltipManager } from "./TooltipManager";
import { ItemHoverDetection } from "../itemHoverDetection";
import { ItemInstance } from "client/types/itemInstance";
import { Functions } from "client/network";
import { RunService } from "@rbxts/services";

@Controller()
export class ItemTooltipHandler implements OnStart {
	private tooltip: Frame | undefined;

	constructor(
		private readonly tooltipManager: TooltipManager,
		private readonly itemHoverDetection: ItemHoverDetection,
	) {}

	private async handle_basicTooltip(itemInstance: ItemInstance) {
		if (this.tooltip) return;

		this.tooltip = Assets.getUI("Tooltips", "ITEM_BasicTooltip")!.Clone();
		(this.tooltip.FindFirstChild("ItemName") as TextLabel).Text = itemInstance.itemType.displayName;

		const canPickupColor =
			itemInstance.model.GetAttribute("canPickup") === true &&
			(await Functions.checkCanPickupItem.invoke({ itemId: itemInstance.id }))
				? Color3.fromRGB(255, 255, 255)
				: Color3.fromRGB(255, 0, 0);

		if (!this.tooltip) return;
		(this.tooltip.WaitForChild("pressFtoPickUp") as TextLabel).TextColor3 = canPickupColor;

		this.tooltipManager.show(this.tooltip);
	}

	onStart(): void {
		this.itemHoverDetection.onHover(() => {
			if (this.itemHoverDetection.itemInstance?.itemType instanceof BaseItem)
				this.handle_basicTooltip(this.itemHoverDetection.itemInstance);
		});

		this.itemHoverDetection.onUnhover(() => {
			this.clearTooltip();
		});

		// changes canPickup color
		RunService.RenderStepped.Connect(async () => {
			if (!this.tooltip || !this.itemHoverDetection.itemInstance) return;

			const itemInstance = this.itemHoverDetection.itemInstance;

			const canPickupColor =
				itemInstance.model.GetAttribute("canPickup") === true &&
				(await Functions.checkCanPickupItem.invoke({ itemId: itemInstance.id }))
					? Color3.fromRGB(255, 255, 255)
					: Color3.fromRGB(255, 0, 0);

			if (!this.tooltip) return;
			(this.tooltip.WaitForChild("pressFtoPickUp") as TextLabel).TextColor3 = canPickupColor;
		});
	}

	//

	private clearTooltip() {
		this.tooltip?.Destroy();
		this.tooltip = undefined;
	}
}
