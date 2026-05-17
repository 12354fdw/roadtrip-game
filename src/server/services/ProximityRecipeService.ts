import { OnStart, Service } from "@flamework/core";

@Service()
export class ProximityRecipeService implements OnStart {
	onStart(): void {
		for (;;) {
			task.wait(1);
		}
	}
}
