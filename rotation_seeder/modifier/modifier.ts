import { config } from "../config.ts";

import type { DestinyActivityModifierDefinition } from "../bungie/types.d.ts";

type ModifierInit = {
  description: string;
  icon_url: string;
  id: string;
  name: string;
};

export class Modifier {
  description: string;
  icon_url: string;
  id: string;
  name: string;

  constructor(init: ModifierInit) {
    this.description = init.description;
    this.icon_url = init.icon_url;
    this.id = init.id;
    this.name = init.name;
  }

  static fromBungieModifier(
    { displayProperties, hash }: DestinyActivityModifierDefinition,
  ) {
    return new Modifier({
      description: displayProperties.description,
      icon_url: new URL(displayProperties.icon, config.get("BUNGIE_BASE_URL"))
        .toString(),
      id: hash.toString(),
      name: displayProperties.name,
    });
  }
}
