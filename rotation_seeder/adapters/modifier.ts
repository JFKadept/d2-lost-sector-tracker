import { DestinyModifier } from "../types/DestinyModifier.ts";
import { Modifier } from "../types/Modifier.ts";

export const modifierAdapter = (modifier: DestinyModifier) => ({
    description: modifier.displayProperties.description,
    icon: `${Deno.env.get("BUNGIE_BASE_URL")}${modifier.displayProperties.icon}`,
    name: modifier.displayProperties.name,
    hash: modifier.hash,
} as Modifier)