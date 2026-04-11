import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { ReplicatedDataServer } from "server/types/replicatedDataServer";
import { PlayerState } from "shared/types/playerData";

@Service()
export class PlayerService implements OnStart {
	private playerDatas = new Map<number, ReplicatedDataServer<PlayerState>>();

	onStart(): void {
		Players.PlayerAdded.Connect((player: Player) => {
			if (this.playerDatas.has(player.UserId)) return;

			const playerState = new PlayerState();

			this.playerDatas.set(
				player.UserId,
				new ReplicatedDataServer<PlayerState>(player, "playerState", playerState),
			);
		});

		Players.PlayerRemoving.Connect((player: Player) => {
			this.playerDatas.delete(player.UserId);
		});
	}
}
