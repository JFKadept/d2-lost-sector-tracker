import { basename, join } from "https://deno.land/std@0.170.0/path/mod.ts";

import { DATA_DIRNAME } from "./constants.ts";
import { BungieClient } from "./bungie/client.ts";
import { LostSector } from "./lost_sector/lost_sector.ts";

import type { BungieManifest, DestinyActivityDefinition, DestinyJSONWorldContent } from "./bungie/types.d.ts";

const LOCALE = "en";

const getJSONWorldComponentPathFileName = (manifest: BungieManifest, component: keyof DestinyJSONWorldContent, locale = LOCALE) => {
  return basename(
    manifest.jsonWorldComponentContentPaths[locale][component],
  )
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const manifest = await BungieClient.getManifest();
  await Deno.writeFile(
    join(DATA_DIRNAME, "Manifest.json"),
    new TextEncoder().encode(JSON.stringify(manifest, null, 2)),
  );

  const activityDefinitions = await BungieClient.getActivities(manifest);
  await Deno.writeFile(
    join(
      DATA_DIRNAME,
      getJSONWorldComponentPathFileName(manifest, "DestinyActivityDefinition"),
    ),
    new TextEncoder().encode(JSON.stringify(activityDefinitions, null, 2)),
  );

  const activityModeDefinition = await BungieClient.getActivityModes(manifest);
  await Deno.writeFile(
    join(
      DATA_DIRNAME,
      basename(
        getJSONWorldComponentPathFileName(manifest, "DestinyActivityModeDefinition"),
      ),
    ),
    new TextEncoder().encode(JSON.stringify(activityModeDefinition, null, 2)),
  );

  const modifierDefinitions = await BungieClient.getModifiers(manifest);
  await Deno.writeFile(
    join(
      DATA_DIRNAME,
      basename(
        getJSONWorldComponentPathFileName(manifest, "DestinyActivityModifierDefinition"),
      ),
    ),
    new TextEncoder().encode(JSON.stringify(modifierDefinitions, null, 2)),
  );

  const inventoryItemDefinitions = await BungieClient.getInventoryItems(
    manifest,
  );
  await Deno.writeFile(
    join(
      DATA_DIRNAME,
      basename(
        getJSONWorldComponentPathFileName(manifest, "DestinyInventoryItemDefinition"),
      ),
    ),
    new TextEncoder().encode(JSON.stringify(inventoryItemDefinitions, null, 2)),
  );

  const lostSectorModeDefinition = Object.values(activityModeDefinition)
    .find((mode) => mode.friendlyName === "lost_sector");

  if (!lostSectorModeDefinition) {
    console.error(
      'No DestinyActivityModeDefinition found for "lost_sector" mode',
    );
    Deno.exit(1);
  }

  const lostSectorActivityDefinitions = Object.values(activityDefinitions)
    .filter((activity) =>
      activity.activityTypeHash === lostSectorModeDefinition.hash &&
      activity.displayProperties.name.includes("Legend")
    ).reduce((activities, activity) => {
      const hasDupeName = !!activities.find((a) =>
        a.originalDisplayProperties.name ===
          activity.originalDisplayProperties.name
      );
      const hasModifiers = activity.modifiers.map((mod) =>
        modifierDefinitions[mod.activityModifierHash]?.displayProperties.name
      ).filter(Boolean).length > 0;

      return hasDupeName || !hasModifiers
        ? activities
        : [...activities, activity];
    }, [] as DestinyActivityDefinition[]).map((activity) => ({
      ...activity,
      modifiers: activity.modifiers.filter((modifier) =>
        !!modifierDefinitions[modifier.activityModifierHash]?.displayProperties
          .name ?? ""
      ),
    })).map(LostSector.fromBungieActivity);

  const lostSector = lostSectorActivityDefinitions[
    Math.floor(Math.random() * lostSectorActivityDefinitions.length)
  ];
  const modifiers = lostSector.description
    .split("\n\n")
    .filter((s) => !s.startsWith("Legend"));

  const modifierDefinitionsArray = Object.values(modifierDefinitions);

  const isChampions = (s: string) => s.toLowerCase().startsWith("champions");
  const isBurn = (s: string) => s.toLowerCase().startsWith("burn");
  const isShields = (s: string) => s.toLocaleLowerCase().startsWith("shields");
  const isModifiers = (s: string) =>
    s.toLocaleLowerCase().startsWith("modifiers");

  const getChampionMods = (s: string) =>
    [...s.matchAll(/\[[a-zA-Z]+\]\s(Overload|Unstoppable|Barrier)/g)]
      .map((match) =>
        modifierDefinitionsArray.find((mod) =>
          mod.displayProperties.name === `Champions: ${match[1]}`
        )
      );

  const getBurnMods = (s: string) =>
    modifierDefinitionsArray.find((mod) => {
      const burn = /\[[a-zA-Z]+\]\s([a-zA-Z]+)/.exec(s)?.[1];
      return mod.displayProperties.name === `${burn} Burn`;
    });

  const getShieldModifiers = (s: string) => {
    const elements = [...s.matchAll(/(\[[a-zA-Z]+\]\s[a-zA-Z]+)/g)].map((
      match,
    ) => match[1]);
    const description = (elements.length > 2
      ? elements
        .map((el, i, arr) =>
          `${arr.length > 1 && i === arr.length - 1 ? "and " : ""}${el}${
            i < arr.length - 1 ? "," : ""
          }`
        ).join(" ")
      : elements.join(" and ")) + " Shields";

    return modifierDefinitionsArray.find((mod) =>
      mod.displayProperties.name === "Shielded Foes" &&
      mod.displayProperties.description === description
    );
  };

  const getModifier = (s: string) =>
    modifierDefinitionsArray.find((mod) =>
      mod.displayProperties.name === s.split("Modifiers: ")[1]
    );

  console.log(
    modifiers.flatMap((mod) => {
      switch (true) {
        case isChampions(mod):
          return getChampionMods(mod);
        case isBurn(mod):
          return getBurnMods(mod) ?? mod;
        case isShields(mod):
          return getShieldModifiers(mod) ?? mod;
        case isModifiers(mod):
          return getModifier(mod) ?? mod;
        default:
          return mod;
      }
    }),
  );
}
