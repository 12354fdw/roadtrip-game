import { Controller, OnStart } from "@flamework/core";
import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";
import { Assets } from "shared/assets";
import { TooltipManager } from "./TooltipManager";
import { ItemHoverDetection } from "../itemHoverDetection";

@Controller()
export class ItemTooltipHandler implements OnStart {
	private tooltip: Frame | undefined;

	constructor(
		private readonly tooltipManager: TooltipManager,
		private readonly itemHoverDetection: ItemHoverDetection,
	) {}

	private handle_basicTooltip(itemDetail: BaseItem) {
		if (this.tooltip) return;

		this.tooltip = Assets.getUI("Tooltips", "ITEM_BasicTooltip")!.Clone();
		(this.tooltip.FindFirstChild("ItemName") as TextLabel).Text = itemDetail.displayName;

		this.tooltipManager.show(this.tooltip);
	}

	onStart(): void {
		this.itemHoverDetection.onHover(() => {
			if (this.itemHoverDetection.itemInstance?.itemType instanceof BaseItem)
				this.handle_basicTooltip(this.itemHoverDetection.itemInstance.itemType);
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
