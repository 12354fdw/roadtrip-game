import { BaseItem, ItemHoldType } from "shared/Items/types/baseItem";
import { Assets } from "shared/assets";

export class ITEM_COLON_THREE_TWOHAND extends BaseItem {
	Type = "ITEM_COLON_THREE_TWOHAND";
	displayName: string = "twohanded :3";

	holdType: ItemHoldType = "TwoHanded";

	model = Assets.getAsset("Items", "COLON_THREE")?.Clone() as Model;
}
