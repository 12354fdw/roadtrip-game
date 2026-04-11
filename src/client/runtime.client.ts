import { Flamework } from "@flamework/core";
import { Items } from "shared/Items";

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");

Flamework.ignite();
$info("flameowrk ignited!");

Items.register();
$info("Items registered!");
