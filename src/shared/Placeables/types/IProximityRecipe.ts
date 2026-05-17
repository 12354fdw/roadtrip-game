import { BaseItem } from "shared/Items/types/baseItem";
import { BasePlaceable } from "./basePlaceable";

export const ProximityRecipeLUT = new Map<string, BasePlaceable[]>();

export interface IProximityRecipe {
	readonly type: "proximity";

	readonly range: number;
	readonly surroundingItems: (new () => BaseItem)[];
	readonly sourceItem: new () => BaseItem;
}
