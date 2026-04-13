import { BaseItem, ItemHoldType } from "shared/Items/ItemTypes/baseItem";
import { Assets } from "shared/assets";

export class ITEM_POT extends BaseItem {
	id = "ITEM_POT";
	displayName: string = "Cooking Pot";

	holdType: ItemHoldType = "OneHanded";

	model = Assets.getAsset("Items", "POT")?.Clone() as Model;
}
