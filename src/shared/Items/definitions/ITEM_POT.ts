import { BaseItem, ItemHoldType, ItemWeight } from "shared/ItemRegistry/ItemTypes/baseItem";
import { Assets } from "shared/assets";

export class ITEM_POT extends BaseItem {
	id = "ITEM_POT";

	holdType: ItemHoldType = "OneHanded";

	model = Assets.getAsset("Items", "POT") as Model;
}
