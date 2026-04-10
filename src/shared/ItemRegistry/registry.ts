import { BaseItem } from "./ItemTypes/baseItem";

export class ItemRegistry {
	private static items = new Map<string, BaseItem>();

	private static registerInstance(item: BaseItem) {
		this.items.set(item.id, item);
	}

	public static get(id: string): BaseItem | undefined {
		return this.items.get(id);
	}

	public static register<T extends BaseItem>(factory: new () => T) {
		ItemRegistry.registerInstance(new factory());
	}
}
