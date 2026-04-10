import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Functions } from "server/network";
import { GlobalFunctions } from "shared/network";
import { PlayerState } from "shared/types/playerData";

@Service()
export class PlayerService implements OnStart {
	private playerDatas = new Map<number, PlayerState>();

	onStart(): void {
		Players.PlayerAdded.Connect((player: Player) => {
			if (this.playerDatas.has(player.UserId)) return;

			this.playerDatas.set(player.UserId, new PlayerState());
		});

		Players.PlayerRemoving.Connect((player: Player) => {
			this.playerDatas.delete(player.UserId);
		});
	}
}
