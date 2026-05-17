import { BaseItem, ItemHoldType } from "shared/Items/types/baseItem";
import { Assets } from "shared/assets";

export class ITEM_POT extends BaseItem {
	Identifier = "ITEM_POT";
	displayName: string = "Cooking Pot";

	holdType: ItemHoldType = "OneHanded";

	model = Assets.getAsset("Items", "POT") as Model;
}
