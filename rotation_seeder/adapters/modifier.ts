import type { DestinyModifier } from "../types/DestinyModifier.ts";
import type { Modifier } from "../types/Modifier.ts";

export const modifierAdapter = (modifier: DestinyModifier) => ({
  id: modifier.hash,
  description: modifier.displayProperties.description,
  icon: `${Deno.env.get("BUNGIE_BASE_URL")}${modifier.displayProperties.icon}`,
  name: modifier.displayProperties.name,
} as Modifier);
