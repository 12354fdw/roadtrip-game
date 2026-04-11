import { ItemRegistry } from "shared/ItemRegistry/registry";
import { ITEM_POT } from "./definitions/ITEM_POT";
import { ITEM_COLON_THREE_TWOHAND } from "./definitions/ITEM_COLON_THREE_TWOHAND";
import { ITEM_COLON_THREE_ONEHAND } from "./definitions/ITEM_COLON_THREE_ONEHAND";

export namespace Items {
	export function register() {
		ItemRegistry.register(ITEM_POT);
		ItemRegistry.register(ITEM_COLON_THREE_ONEHAND);
		ItemRegistry.register(ITEM_COLON_THREE_TWOHAND);
	}
}
