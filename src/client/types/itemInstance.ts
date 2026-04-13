import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";

export class ItemInstance {
	public readonly id: number;

	constructor(public readonly itemType: BaseItem, public readonly model: Model) {
		this.id = tonumber(model.Name)!;
	}
}
