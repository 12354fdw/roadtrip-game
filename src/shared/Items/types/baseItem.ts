export type ItemHoldType = "TwoHanded" | "OneHanded";

export abstract class BaseItem {
	public onCreationServer(): void {} // for setting up advanced interactions

	abstract readonly id: string;
	abstract readonly displayName: string;

	abstract readonly holdType: ItemHoldType;

	abstract readonly model: Model;

	public equiped: boolean = false;
}
