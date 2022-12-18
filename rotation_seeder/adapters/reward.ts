import { DestinyInventoryItem } from "../types/DestinyInventoryItem.ts";
import { Reward } from "../types/Reward.ts"

export const rewardAdapter = (reward: DestinyInventoryItem): Reward => ({
    id: reward.hash,
    icon: `${Deno.env.get("BUNGIE_BASE_URL")}${reward.displayProperties.icon}`,
    name: reward.displayProperties.name,
})