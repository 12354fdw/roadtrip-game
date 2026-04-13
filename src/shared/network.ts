import { Networking } from "@flamework/networking";
import { dropItem, pickupItem, replicatedData, requestReplicatedData } from "./networkTypes";

interface C2S_Events {
	requestReplicatedData(event: requestReplicatedData): void;
	pickupItem(event: pickupItem): void;
	dropItem(event: dropItem): void;
}

interface S2C_Events {
	replicatedData(event: replicatedData): void;
}

interface C2S2C_Functions {}

interface S2C2S_Functions {}

export const GlobalEvents = Networking.createEvent<C2S_Events, S2C_Events>();
export const GlobalFunctions = Networking.createFunction<C2S2C_Functions, S2C2S_Functions>();
