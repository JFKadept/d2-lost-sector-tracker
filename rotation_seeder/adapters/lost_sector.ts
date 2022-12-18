import { DestinyActivity } from "../types/DestinyActivity.ts";
import { LostSector } from "../types/LostSector.ts";
import { Modifier } from "../types/Modifier.ts";

export const lostSectorAdapter = (activity: DestinyActivity, modifiers: Modifier[]) => ({
    hash: activity.hash,
    image: `${Deno.env.get("BUNGIE_BASE_URL")}${activity.pgcrImage}`,
    modifiers: modifiers,
    name: activity.originalDisplayProperties.name,
} as LostSector)