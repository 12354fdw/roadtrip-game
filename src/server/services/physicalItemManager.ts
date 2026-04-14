import { Service } from "@flamework/core";
import { BaseItem } from "shared/Items/types/baseItem";
import { iterateOnDescendants } from "shared/utils";

interface gripAttachments {
	right: Attachment;
	left: Attachment;
}

@Service()
export class PhysicalItemManager {
	private equipHelper(item: BaseItem, attachment: Attachment) {
		const handle = item.model.WaitForChild("Handle") as BasePart;

		handle.CFrame = attachment.WorldCFrame;

		const weld = new Instance("WeldConstraint");
		weld.Name = "_GripWeld";
		weld.Part0 = attachment.Parent as BasePart;
		weld.Part1 = handle;
		weld.Parent = item.model;

		iterateOnDescendants(item.model, (instance: Instance) => {
			// too lazy to check properly
			pcall(() => {
				(instance as BasePart).CanCollide = false;
			});
		});
	}

	public equip(item: BaseItem, character: Model, hand: "Left" | "Right" | "Both") {
		const gripAttachments = this.getGripAttachments(character);

		switch (hand) {
			case "Right":
				this.equipHelper(item, gripAttachments.right);
				break;

			case "Left":
				this.equipHelper(item, gripAttachments.left);
				break;

			case "Both":
				this.equipHelper(item, gripAttachments.left);
				break;
		}
	}

	public drop(item: BaseItem, position: CFrame) {
		iterateOnDescendants(item.model, (instance: Instance) => {
			// too lazy to check properly
			pcall(() => {
				(instance as BasePart).CanCollide = true;
			});
		});

		item.model.WaitForChild("_GripWeld").Destroy();

		(item.model.WaitForChild("Handle") as BasePart).CFrame = position.add(
			new Vector3(0, item.model.GetExtentsSize().Y, 0), // prevent clipping into the floor sometimes
		);

		item.model.SetAttribute("canPickup", true);
	}

	private getGripAttachments(character: Model): gripAttachments {
		const isR15 = character.FindFirstChild("UpperTorso") !== undefined;

		const rightPart = character.WaitForChild(isR15 ? "RightHand" : "RightArm") as BasePart;
		const leftPart = character.WaitForChild(isR15 ? "LeftHand" : "LeftArm") as BasePart;

		const right = rightPart.WaitForChild("RightGripAttachment") as Attachment;
		const left = leftPart.WaitForChild("LeftGripAttachment") as Attachment;

		return { right, left };
	}
}
