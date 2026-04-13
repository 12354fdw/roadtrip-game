import { BaseItem, ItemHoldType } from "shared/Items/ItemTypes/baseItem";

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
	public left: BaseItem | undefined;
	public right: BaseItem | undefined;
}

export class PlayerClothing {
	// TODO: add this
}

// Sendable data to client

// TODO: add the rest
export interface SendablePlayerState {
	stats: PlayerStats;
}
