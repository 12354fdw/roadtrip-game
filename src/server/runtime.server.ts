import { Flamework } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Items } from "shared/Items";
import { Placeables } from "shared/Placeables";

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");

Workspace.FindFirstChild("Assets")!.Parent = ReplicatedStorage;

const ItemsFolder = new Instance("Folder");
ItemsFolder.Name = "Items";
ItemsFolder.Parent = Workspace;

Items.register();
$info("Items registered!");

Placeables.register();
$info("Placeables registered!");

Flamework.ignite();
$info("flameowrk ignited!");
