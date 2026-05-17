import { Flamework } from "@flamework/core";
import { Items } from "shared/Items";
import { Placeables } from "shared/Placeables";

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");

Items.register();
$info("Items registered!");

Placeables.register();
$info("Placeables registered!");

Flamework.ignite();
$info("flameowrk ignited!");
