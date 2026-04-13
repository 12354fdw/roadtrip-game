import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { PlayerState } from "shared/types/playerData";

@Service()
export class PlayerService implements OnStart {
	private playerDatas = new Map<number, PlayerState>();

	onStart(): void {
		Players.PlayerAdded.Connect((player: Player) => {
			if (this.playerDatas.has(player.UserId)) return;

			const playerState = new PlayerState();

			this.playerDatas.set(player.UserId, playerState);
		});

		Players.PlayerRemoving.Connect((player: Player) => {
			this.playerDatas.delete(player.UserId);
		});
	}

	// returns a reference
	public getPlayerData(player: Player) {
		return this.playerDatas.get(player.UserId);
	}
}
