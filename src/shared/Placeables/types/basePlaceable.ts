import { IProximityRecipe } from "./IProximityRecipe";

export abstract class BasePlaceable {
	public onCreationServer(): void {}

	abstract readonly Identifier: string;
	abstract readonly displayName: string;

	abstract readonly finalModel: Model;

	// sometimes used
	abstract readonly constructionStages: Model[];
	// abstract readonly ghostPreview: Model; // yes you need to make the ghost model

	abstract readonly constructionType: IProximityRecipe;
}
