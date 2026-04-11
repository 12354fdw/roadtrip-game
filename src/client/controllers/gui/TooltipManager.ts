import { Controller } from "@flamework/core";
import { Players, RunService, UserInputService } from "@rbxts/services";

@Controller()
export class TooltipManager {
	private toolTipFrame: Frame | undefined;
	private disconnect: (() => void) | undefined = undefined;

	public show(tooltip: Frame) {
		this.hide();

		this.toolTipFrame = tooltip;

		tooltip.Parent = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("Popups");
		tooltip.Visible = true;

		const connection = RunService.RenderStepped.Connect(() => {
			const mousePos = UserInputService.GetMouseLocation();
			tooltip.Position = new UDim2(0, mousePos.X + 16, 0, mousePos.Y - 32);
		});

		this.disconnect = () => connection.Disconnect();
	}

	public hide() {
		if (this.toolTipFrame) {
			this.toolTipFrame.Destroy();
		}

		if (this.disconnect) {
			this.disconnect();
			this.disconnect = undefined;
		}
	}
}
