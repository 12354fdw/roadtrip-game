import { OnStart, Service } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";
import { ITEM_COLON_THREE_ONEHAND } from "shared/Items/definitions/ITEM_COLON_THREE_ONEHAND";
import { ITEM_COLON_THREE_TWOHAND } from "shared/Items/definitions/ITEM_COLON_THREE_TWOHAND";

@Service()
export class ItemManager implements OnStart {
	private items = new Map<number, BaseItem>();
	private nextId = 0;

	public createItem<T extends BaseItem>(itemType: new () => T, position: Vector3): T {
		const item = new itemType();

		this.items.set(this.nextId, item);
		item.model.SetAttribute("id", this.nextId);
		item.model.SetAttribute("type", item.id);
		if (!item.model.HasTag("Item")) item.model.AddTag("Item");
		this.nextId++;

		item.model.Parent = Workspace;
		item.model.MoveTo(position);

		return item;
	}

	onStart(): void {
		this.createItem(ITEM_COLON_THREE_ONEHAND, new Vector3(0, 10, 0));
		this.createItem(ITEM_COLON_THREE_TWOHAND, new Vector3(10, 10, 0));
	}
}
