import { Assets } from "shared/assets";
import { BaseItem, ItemHoldType } from "../types/baseItem";

export class ITEM_FIREWOOD extends BaseItem {
	Identifier = "ITEM_FIREWOOD";
	displayName: string = "Firewood";

	holdType: ItemHoldType = "OneHanded";

	model = Assets.getAsset("Items", "FIREWOOD") as Model;
}
