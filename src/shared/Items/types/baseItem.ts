export type ItemHoldType = "TwoHanded" | "OneHanded";

export abstract class BaseItem {
	public onCreationServer(): void {} // for setting up advanced interactions

	abstract readonly Identifier: string;
	abstract readonly displayName: string;

	abstract readonly holdType: ItemHoldType;

	abstract readonly model: Model;
}
