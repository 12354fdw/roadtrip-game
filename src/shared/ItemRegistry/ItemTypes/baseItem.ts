export enum ItemWeight {
	VeryLight = 16,
	Light = 8,
	Normal = 1,
}

export abstract class BaseItem {
	onCreation(): void {} // for setting up advanced interactions

	abstract weight: ItemWeight;
	abstract id: string;

	abstract model: Model;

	public equiped: boolean = false;
}

export interface ItemStack {
	item: BaseItem;
	count: number;
}
