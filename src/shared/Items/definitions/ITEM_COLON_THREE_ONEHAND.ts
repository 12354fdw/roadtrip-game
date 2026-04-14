import { BaseItem, ItemHoldType } from "shared/Items/types/baseItem";
import { Assets } from "shared/assets";

export class ITEM_COLON_THREE_ONEHAND extends BaseItem {
	id = "ITEM_COLON_THREE_ONEHAND";
	displayName: string = "onehanded :3";

	holdType: ItemHoldType = "OneHanded";

	model = Assets.getAsset("Items", "COLON_THREE")?.Clone() as Model;
}
