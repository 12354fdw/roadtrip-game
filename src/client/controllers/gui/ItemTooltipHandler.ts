import { Controller, OnStart } from "@flamework/core";
import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";
import { Assets } from "shared/assets";
import { TooltipManager } from "./TooltipManager";
import { ItemHoverDetection } from "../itemHoverDetection";
import { ItemInstance } from "client/types/itemInstance";

@Controller()
export class ItemTooltipHandler implements OnStart {
	private tooltip: Frame | undefined;

	constructor(
		private readonly tooltipManager: TooltipManager,
		private readonly itemHoverDetection: ItemHoverDetection,
	) {}

	private handle_basicTooltip(itemDetail: ItemInstance) {
		if (this.tooltip) return;

		this.tooltip = Assets.getUI("Tooltips", "ITEM_BasicTooltip")!.Clone();
		(this.tooltip.FindFirstChild("ItemName") as TextLabel).Text = itemDetail.itemType.displayName;

		const canPickupColor =
			itemDetail.model.GetAttribute("canPickup") === true
				? Color3.fromRGB(255, 255, 255)
				: Color3.fromRGB(255, 0, 0);

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
	}

	//

	private clearTooltip() {
		this.tooltip?.Destroy();
		this.tooltip = undefined;
	}
}
