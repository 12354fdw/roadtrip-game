import { BaseItem, ItemHoldType, ItemWeight } from "shared/ItemRegistry/ItemTypes/baseItem";
import { Assets } from "shared/assets";

export class ITEM_COLON_THREE_TWOHAND extends BaseItem {
	id = "ITEM_COLON_THREE_TWOHAND";

	holdType: ItemHoldType = "OneHanded";

	model = Assets.getAsset("Items", "COLON_THREE") as Model;
}
