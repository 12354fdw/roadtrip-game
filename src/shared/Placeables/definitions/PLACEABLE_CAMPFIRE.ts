import { Assets } from "shared/assets";
import { BasePlaceable } from "../types/basePlaceable";

export class PLACEABLE_CAMPFIRE extends BasePlaceable {
	Identifier = "PLACEABLE_CAMPFIRE";
	displayName = "Campfire";

	constructionStages = [];
	finalModel = Assets.getPlaceable("CAMPFIRE", "FULLYBUILT");

	ghostPreview = Assets.getPlaceable("CAMPFIRE", "GHOST");
}
