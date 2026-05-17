import { PLACEABLE_CAMPFIRE } from "./definitions/PLACEABLE_CAMPFIRE";
import { PlaceableRegistry } from "./registry";

export namespace Placeables {
	export function register() {
		PlaceableRegistry.register(PLACEABLE_CAMPFIRE);
	}
}
