import { findFirstAncestorOfTag } from "shared/utils";
import { ItemInstance } from "./types/itemInstance";
import { ItemRegistry } from "shared/Items/registry";

export function checkIfIsItem(part: BasePart): ItemInstance | undefined {
	const itemModel = findFirstAncestorOfTag(part, "Item") as Model;
	if (!itemModel) return;

	const itemType = itemModel.GetAttribute("type") as string;
	if (itemType === undefined || itemType === "") return;

	const itemInstance = new ItemInstance(ItemRegistry.get(itemType)!, itemModel);
	return itemInstance;
}
