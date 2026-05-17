export abstract class BasePlaceable {
	public onCreationServer(): void {}

	abstract readonly Identifier: string;
	abstract readonly displayName: string;

	abstract readonly constructionStages: Model[];
	abstract readonly finalModel: Model;

	abstract readonly ghostPreview: Model; // yes you need to make the ghost model
}
