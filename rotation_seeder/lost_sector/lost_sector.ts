import { config } from "../config.ts";

import type { DestinyActivityDefinition } from "../bungie/types.d.ts";

type LocationReference = {
  destination: number;
  place: number;
};

type LostSectorInit = {
  id: string | number;
  name: string;
  description: string;
  modifiers: number[];
  image_url: string;
  location: LocationReference;
};

export class LostSector {
  id: string;
  name: string;
  description: string;
  modifiers: number[];
  image_url: string;
  location: LocationReference;

  constructor(init: LostSectorInit) {
    this.id = init.id.toString();
    this.name = init.name;
    this.description = init.description;
    this.modifiers = init.modifiers;
    this.image_url = init.image_url;
    this.location = init.location;
  }

  static fromBungieActivity(activity: DestinyActivityDefinition) {
    return new LostSector({
      description: activity.originalDisplayProperties.description,
      id: activity.hash,
      image_url: new URL(activity.pgcrImage, config.get("BUNGIE_BASE_URL"))
        .toString(),
      location: {
        destination: activity.destinationHash,
        place: activity.placeHash,
      },
      modifiers: activity.modifiers.map((modifier) =>
        modifier.activityModifierHash
      ),
      name: activity.originalDisplayProperties.name,
    });
  }
}
