import { BaseItem, ItemHoldType } from "shared/ItemRegistry/ItemTypes/baseItem";
import { Assets } from "shared/assets";

export class ITEM_COLON_THREE_TWOHAND extends BaseItem {
	id = "ITEM_COLON_THREE_TWOHAND";
	displayName: string = "twohanded :3";

	holdType: ItemHoldType = "OneHanded";

	model = Assets.getAsset("Items", "COLON_THREE")?.Clone() as Model;
}
