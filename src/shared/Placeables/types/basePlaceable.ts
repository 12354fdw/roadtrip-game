export abstract class BasePlaceable {
	public onCreationServer(): void {}

	abstract Type: string;
	abstract displayName: string;

	abstract constructionStages: Array<Model>;
	abstract finalModel: Model;

	abstract ghostPreview: Model; // yes you need to make the ghost model
}
