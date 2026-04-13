import { Flamework } from "@flamework/core";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Items } from "shared/Items";

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");

Workspace.FindFirstChild("Assets")!.Parent = ReplicatedStorage;

const ItemsFolder = new Instance("Folder");
ItemsFolder.Name = "Items";
ItemsFolder.Parent = Workspace;

Flamework.ignite();
$info("flameowrk ignited!");

Items.register();
$info("Items registered!");
