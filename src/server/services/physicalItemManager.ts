import { Service } from "@flamework/core";
import { BaseItem } from "shared/ItemRegistry/ItemTypes/baseItem";

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
		weld.Part0 = attachment.Parent as BasePart;
		weld.Part1 = handle;
		weld.Parent = attachment.Parent;
	}

	public equip(item: BaseItem, character: Model, hand: "Left" | "Right" | "Both") {
		const gripAttachments = this.getGripAttachments(character);

		switch (hand) {
			case "Right":
				this.equipHelper(item, gripAttachments.right);
				break;

			case "Left":
				this.equipHelper(item, gripAttachments.left);
		}
	}

	public drop(item: BaseItem, position: Vector3) {}

	private getGripAttachments(character: Model): gripAttachments {
		const isR15 = character.FindFirstChild("UpperTorso") !== undefined;

		const rightPart = character.WaitForChild(isR15 ? "RightHand" : "RightArm") as BasePart;
		const leftPart = character.WaitForChild(isR15 ? "LeftHand" : "LeftArm") as BasePart;

		const right = rightPart.WaitForChild("RightGripAttachment") as Attachment;
		const left = leftPart.WaitForChild("LeftGripAttachment") as Attachment;

		return { right, left };
	}
}
