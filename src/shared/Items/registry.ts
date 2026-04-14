import { BaseItem } from "./types/baseItem";

export class ItemRegistry {
	private static items = new Map<string, BaseItem>();

	private static registerInstance(item: BaseItem) {
		this.items.set(item.id, item);
	}

	public static get(id: string): BaseItem | undefined {
		return this.items.get(id);
	}

	public static register<T extends BaseItem>(factory: new () => T) {
		const instance = new factory();
		ItemRegistry.registerInstance(instance);

		if (!instance.model.HasTag("Item")) instance.model.AddTag("Item");
		instance.model.SetAttribute("type", instance.id);
	}
}
