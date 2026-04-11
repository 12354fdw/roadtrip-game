import { Controller, OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";
import { ItemRegistry } from "shared/ItemRegistry/registry";
import { Assets } from "shared/assets";
import { findFirstAncestorOfTag } from "shared/utils";
import { TooltipManager } from "./TooltipManager";

@Controller()
export class itemInteractionHandler implements OnStart {
	private localPlayer = Players.LocalPlayer;
	private tooltip: Frame | undefined;

	constructor(private tooltipManager: TooltipManager) {}

	private handle_basicTooltip(itemDetail: BaseItem) {
		if (this.tooltip) return;

		this.tooltip = Assets.getUI("Tooltips", "ITEM_BasicTooltip")!.Clone();
		(this.tooltip.FindFirstChild("ItemName") as TextLabel).Text = itemDetail.displayName;

		this.tooltipManager.show(this.tooltip);
	}

	onStart(): void {
		RunService.RenderStepped.Connect(() => {
			const itemDetail = this.checkIfIsItem();
			if (!itemDetail) return;

			if (itemDetail instanceof BaseItem) this.handle_basicTooltip(itemDetail);
		});
	}

	//

	private clearTooltip() {
		this.tooltip?.Destroy();
		this.tooltip = undefined;
	}

	private checkIfIsItem(): BaseItem | undefined {
		const part = this.localPlayer.GetMouse().Target;
		if (!part) {
			this.clearTooltip();
			return;
		}

		const itemModel = findFirstAncestorOfTag(part, "Item");
		if (!itemModel) {
			this.clearTooltip();
			return;
		}

		const itemType = itemModel.GetAttribute("type") as string;
		if (itemType === undefined || itemType === "") {
			this.clearTooltip();
			return;
		}

		const itemDetail = ItemRegistry.get(itemType);
		if (!itemDetail) {
			this.clearTooltip();
			return;
		}

		return itemDetail;
	}
}
