import { Assets } from "shared/assets";
import { BasePlaceable } from "../types/basePlaceable";
import { IProximityRecipe } from "../types/IProximityRecipe";
import { ITEM_FIREWOOD } from "shared/Items/definitions/ITEM_FIREWOOD";

export class PLACEABLE_CAMPFIRE extends BasePlaceable {
	Identifier = "PLACEABLE_CAMPFIRE";
	displayName = "Campfire";

	constructionStages = [];
	finalModel = Assets.getPlaceable("CAMPFIRE", "FULLYBUILT");

	constructionType: IProximityRecipe = {
		range: 5,
		surroundingItems: [ITEM_FIREWOOD, ITEM_FIREWOOD, ITEM_FIREWOOD],
		sourceItem: ITEM_FIREWOOD,
	};
}
