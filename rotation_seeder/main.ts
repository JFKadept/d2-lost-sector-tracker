import "https://deno.land/std@0.168.0/dotenv/load.ts";

import { modifierAdapter } from "./adapters/modifier.ts"
import { lostSectorAdapter } from "./adapters/lost_sector.ts";
import { getActivityModifierHashes } from "./lib/get_activity_modifier_hashes.ts"
import { getUniqueDestinyEntities } from "./lib/get_unique_destiny_entities.ts"
import { getActivityRewardHashes } from "./lib/get_activity_reward_hashes.ts"

import { DestinyActivity } from "./types/DestinyActivity.ts";
import { DestinyModifier } from "./types/DestinyModifier.ts";
import { rewardAdapter } from "./adapters/reward.ts";
import { BungieClient } from "./clients/bungie.ts";
import { DestinyInventoryItem } from "./types/DestinyInventoryItem.ts";

const bungieClient = new BungieClient()

const LOST_SECTOR_NAMES = [
    "K1 Logistics",
    "K1 Crew Quarters",
    "K1 Revelation",
    "K1 Communion",
    "Bunker E15",
    "Concealed Void",
    "Perdition",
    "Sepulcher",
    "Extraction",
    "Chamber of Starlight",
    "Aphelion's Rest",
]

async function main(locale: string) {
    const {
        DestinyActivityDefinition,
        DestinyActivityModifierDefinition,
        DestinyInventoryItemDefinition,
    } = await bungieClient.getJSONWorldContent(locale)

    const activityDefs = Object.values(DestinyActivityDefinition) as DestinyActivity[]

    const legendLostSectorActivityDefs = LOST_SECTOR_NAMES
        .map((name) => activityDefs.find((activity) =>
            activity.displayProperties.name.match(name)
            && activity.displayProperties.name.endsWith("Legend")
        )) as DestinyActivity[]

    const modifiers = legendLostSectorActivityDefs
        .flatMap(getActivityModifierHashes)
        .map((hash) => DestinyActivityModifierDefinition[hash] as DestinyModifier)
        .filter((mod) => !!mod?.displayProperties.name)
        .reduce(getUniqueDestinyEntities, [] as DestinyModifier[])
        .map(modifierAdapter)

    const rewards = legendLostSectorActivityDefs
        .flatMap(getActivityRewardHashes)
        .map((hash) => DestinyInventoryItemDefinition[hash] as DestinyInventoryItem)
        .reduce(getUniqueDestinyEntities, [] as DestinyInventoryItem[])
        .filter((reward) => reward.displayProperties.name.includes("Exotic"))
        .map(rewardAdapter)

    // TODO: populate Sanity
}

main("en")
