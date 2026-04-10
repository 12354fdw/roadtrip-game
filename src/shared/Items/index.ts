import { ItemRegistry } from "shared/ItemRegistry/registry";
import ITEM_POT from "./definitions/itemPot";

export namespace Items {
	export const POT = ITEM_POT;

	export function register() {
		ItemRegistry.register(ITEM_POT);
	}
}
