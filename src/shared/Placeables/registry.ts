import { BasePlaceable } from "./types/basePlaceable";

export class PlaceableRegistry {
	private static placeables = new Map<string, BasePlaceable>();

	private static registerInstance(placeable: BasePlaceable) {
		this.placeables.set(placeable.Type, placeable);
	}

	public static get(Type: string): BasePlaceable | undefined {
		return this.placeables.get(Type);
	}

	public static register<T extends BasePlaceable>(factory: new () => T) {
		const instance = new factory();
		PlaceableRegistry.registerInstance(instance);

		if (!instance.finalModel.HasTag("Item")) instance.finalModel.AddTag("Item");
		instance.finalModel.SetAttribute("type", instance.Type);
	}
}
