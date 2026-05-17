import { IProximityRecipe, ProximityRecipeLUT } from "./types/IProximityRecipe";
import { BasePlaceable } from "./types/basePlaceable";

export class PlaceableRegistry {
	private static placeables = new Map<string, BasePlaceable>();

	private static registerInstance(placeable: BasePlaceable) {
		this.placeables.set(placeable.Identifier, placeable);
	}

	public static get(Type: string): BasePlaceable | undefined {
		return this.placeables.get(Type);
	}

	public static register<T extends BasePlaceable>(factory: new () => T) {
		const instance = new factory();
		PlaceableRegistry.registerInstance(instance);

		if (!instance.finalModel.HasTag("Placeable")) instance.finalModel.AddTag("Placeable");
		instance.finalModel.SetAttribute("type", instance.Identifier);
	}

	public static generateLUT() {
		this.placeables.forEach((placeable: BasePlaceable, key: string) => {
			if (placeable.constructionType.type !== "proximity") return;

			const recipe = placeable.constructionType as IProximityRecipe;

			const sourceId = new recipe.sourceItem().Identifier;

			const existing = ProximityRecipeLUT.get(sourceId) ?? [];

			existing.push(placeable);
			ProximityRecipeLUT.set(sourceId, existing);
		});
	}
}
