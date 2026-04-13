import { Controller, OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { ItemInstance } from "client/types/itemInstance";
import { ClientSingletons } from "./utils/singletons";
import { checkIfIsItem } from "client/utils";

@Controller()
export class ItemHoverDetection implements OnStart {
	private hoverListeners: Set<(item: ItemInstance) => void> = new Set();
	private unhoverListeners: Set<(item: ItemInstance) => void> = new Set();
	public itemInstance: ItemInstance | undefined;

	constructor(private readonly clientSingletons: ClientSingletons) {}

	public onHover(cb: (item: ItemInstance) => void): () => void {
		this.hoverListeners.add(cb);
		return () => this.hoverListeners.delete(cb);
	}

	public onUnhover(cb: (item: ItemInstance) => void): () => void {
		this.unhoverListeners.add(cb);
		return () => this.unhoverListeners.delete(cb);
	}

	onStart(): void {
		RunService.RenderStepped.Connect(() => {
			const part = this.clientSingletons.localPlayer.GetMouse().Target as BasePart | undefined;
			const newItem = part ? checkIfIsItem(part) : undefined;

			const wasHovering = this.itemInstance;
			const isHovering = newItem;

			if (!wasHovering && isHovering) {
				this.itemInstance = isHovering;
				this.hoverListeners.forEach((cb) => cb(isHovering));
			} else if (wasHovering && !isHovering) {
				this.itemInstance = undefined;
				this.unhoverListeners.forEach((cb) => cb(wasHovering));
			} else if (wasHovering && isHovering && wasHovering.id !== isHovering.id) {
				this.unhoverListeners.forEach((cb) => cb(wasHovering));
				this.itemInstance = isHovering;
				this.hoverListeners.forEach((cb) => cb(isHovering));
			}
		});
	}
}
