export abstract class BaseItem {
	onCreation(): void {} // for setting up advanced interactions

	abstract stackCount: number;
	abstract id: string;

	abstract model: Model;
}

export interface ItemStack {
	item: BaseItem;
	count: number;
}
