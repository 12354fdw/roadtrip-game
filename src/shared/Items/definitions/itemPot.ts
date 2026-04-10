import { BaseItem, ItemWeight } from "shared/ItemRegistry/ItemTypes/baseItem";
import { Assets } from "shared/assets";

class ITEM_POT extends BaseItem {
	weight: ItemWeight = ItemWeight.Normal;
	id = "ITEM_POT";

	model = Assets.getAsset("Items", "Pot") as Model;
}

export default ITEM_POT;
