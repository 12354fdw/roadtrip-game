import { BaseItem } from "shared/ItemRegistry/baseItem";
import { Assets } from "shared/assets";

class ITEM_POT extends BaseItem {
	stackCount = 1;
	id = "ITEM_POT";

	model = Assets.getAsset("Items", "Pot") as Tool;
}

export default ITEM_POT;
