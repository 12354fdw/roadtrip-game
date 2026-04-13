import { OnStart, Service } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";
import { ITEM_COLON_THREE_ONEHAND } from "shared/Items/definitions/ITEM_COLON_THREE_ONEHAND";
import { ITEM_COLON_THREE_TWOHAND } from "shared/Items/definitions/ITEM_COLON_THREE_TWOHAND";
import { ITEM_POT } from "shared/Items/definitions/ITEM_POT";

@Service()
export class ItemManager implements OnStart {
	private items = new Map<number, BaseItem>();
	private nextId = 0;

	public createItem<T extends BaseItem>(itemType: new () => T, position: Vector3): T {
		const item = new itemType();

		this.items.set(this.nextId, item);

		item.model.Name = tostring(this.nextId);
		item.model.SetAttribute("type", item.id);
		item.model.SetAttribute("canPickup", true);

		if (!item.model.HasTag("Item")) item.model.AddTag("Item");
		this.nextId++;

		item.model.Parent = Workspace.WaitForChild("Items");
		item.model.MoveTo(position);

		return item;
	}

	public get(id: number): BaseItem | undefined {
		return this.items.get(id);
	}

	onStart(): void {
		this.createItem(ITEM_COLON_THREE_ONEHAND, new Vector3(0, 10, 0));
		this.createItem(ITEM_COLON_THREE_TWOHAND, new Vector3(10, 10, 0));
		this.createItem(ITEM_POT, new Vector3(0, 10, 10));
	}
}
