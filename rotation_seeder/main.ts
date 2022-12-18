import "https://deno.land/std@0.168.0/dotenv/load.ts";

import { modifierAdapter } from "./adapters/modifier.ts"
import { lostSectorAdapter } from "./adapters/lost_sector.ts";

import { DestinyActivity } from "./types/DestinyActivity.ts";
import { DestinyInventoryItem } from "./types/DestinyInventoryItem.ts"
import { DestinyModifier } from "./types/DestinyModifier.ts";
import { Modifier } from "./types/Modifier.ts";

const { BUNGIE_API_KEY, BUNGIE_BASE_URL } = Deno.env.toObject()

async function main(locale: string) {
    const manifestRes = await fetch(`${BUNGIE_BASE_URL}/platform/destiny2/manifest`, {
        headers: {
            "x-api-key": BUNGIE_API_KEY ?? "",
        },
    })
    const manifest = await manifestRes.json()

    const jsonWorldContentRes = await fetch(`${BUNGIE_BASE_URL}${manifest.Response.jsonWorldContentPaths[locale]}`, {
        headers: {
            "x-api-key": BUNGIE_API_KEY ?? "",
        }
    })
    const {
        DestinyActivityDefinition,
        DestinyInventoryItemDefinition,
        DestinyActivityModifierDefinition,
    } = await jsonWorldContentRes.json()

    const activities = Object
        .values(DestinyActivityDefinition as Record<string, DestinyActivity>)
        .filter((activity) => (
            activity.activityTypeHash === 103143560 // nightfall type hash
            && activity.selectionScreenDisplayProperties.name === "Master"
        ))

    // get all unique rewards
    const rewardHashes: number[] = []
    activities.forEach((activity) => {
        activity.rewards.forEach((reward) => {
            const rewardItemHash = reward.rewardItems[0].itemHash
            if (!rewardHashes.includes(rewardItemHash)) {
                rewardHashes.push(rewardItemHash)
            }
        })
    })

    const rewards: DestinyInventoryItem[] = rewardHashes.map((hash) => DestinyInventoryItemDefinition[hash])
    // TODO: insert rewards into Sanity

    // get all unique modifiers
    const modifierHashes: number[] = []
    activities.forEach((activity) => {
        activity.modifiers.forEach(({ activityModifierHash }) => {
            if (!modifierHashes.includes(activityModifierHash)) {
                modifierHashes.push(activityModifierHash)
            }
        })
    })

    const modifiers = modifierHashes
        .map((hash) => DestinyActivityModifierDefinition[hash])
        .filter((mod: DestinyModifier) => !!mod?.displayProperties.name)
        .map(modifierAdapter)
        .reduce((mods, mod) => ({
            ...mods,
            [mod.hash]: mod,
        }), {} as Record<string, Modifier>)
    // TODO: insert mods into Sanity

    const lostSectors = activities.map((ls) => {
        const mods = ls.modifiers
            .map((mod) => mod.activityModifierHash)
            .filter((hash) => hash in modifiers)
            .map((hash) => modifiers[hash])
        return lostSectorAdapter(ls, mods)
    })
    // TODO: insert lostSectors into Sanity
}

main("en")
