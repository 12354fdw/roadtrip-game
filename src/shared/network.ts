import { Networking } from "@flamework/networking";

interface C2S_Events {}

interface S2C_Events {}

interface C2S2C_Functions {}

interface S2C2S_Functions {}

export const GlobalEvents = Networking.createEvent<C2S_Events, S2C_Events>();
export const GlobalFunctions = Networking.createFunction<C2S2C_Functions, S2C2S_Functions>();
