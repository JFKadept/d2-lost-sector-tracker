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
import { Modifier } from "./types/Modifier.ts";
import { SanityClient } from "./clients/sanity.ts";
import { DestinyActivityMode } from "./types/DestinyActivityMode.ts";

const bungieClient = new BungieClient()
const sanityClient = new SanityClient()

async function main(locale: string) {
    const {
        DestinyActivityDefinition,
        DestinyActivityModeDefinition,
        DestinyActivityModifierDefinition,
        DestinyInventoryItemDefinition,
    } = await bungieClient.getJSONWorldContent(locale)

    const lostSectorMode = (Object.values(DestinyActivityModeDefinition) as DestinyActivityMode[]).find((mode) => mode.friendlyName === "lost_sector")

    const legendLostSectorActivityDefs = (Object.values(DestinyActivityDefinition) as DestinyActivity[])
        .filter((activity) =>
            activity.activityTypeHash === lostSectorMode?.hash
            && activity.displayProperties.name.includes("Legend")
        )

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
        
    const modifierMap = modifiers.reduce((mods, mod) => ({
        ...mods,
        [mod.id]: mod,
    }), {} as Record<string, Modifier>)

    const lostSectors = legendLostSectorActivityDefs.map(lostSectorAdapter(modifierMap))
    // TODO: populate Sanity

    try {
        const { results } = await sanityClient.seedData(rewards, modifiers, lostSectors, { returnIds: true })
        console.log(`Committed ${results.length} mutations`)
    } catch (error) {
        console.error(error.message)
    }
}

main("en")
