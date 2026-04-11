import { BaseItem, ItemHoldType } from "shared/ItemRegistry/ItemTypes/baseItem";

export class PlayerState {
	public stats: PlayerStats = new PlayerStats();
	public hands: PlayerHands = new PlayerHands();
	public clothing: PlayerClothing = new PlayerClothing();
}

export class PlayerStats {
	public health: number = 100;
	public hunger: number = 100;
	public thirst: number = 100;
	public temperature: number = 28; // in celsius

	// TODO: add nutrition
}

export class PlayerHands {
	public handMode: ItemHoldType = "OneHanded";

	// OneHanded Data
	public left: BaseItem | undefined;
	public right: BaseItem | undefined;

	// TwoHanded Data
	public both: BaseItem | undefined;
}

export class PlayerClothing {
	// TODO: add this
}
