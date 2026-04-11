export type ItemHoldType = "TwoHanded" | "OneHanded";

export abstract class BaseItem {
	onCreation(): void {} // for setting up advanced interactions

	abstract id: string;

	abstract holdType: ItemHoldType;

	abstract model: Model;

	public equiped: boolean = false;
}