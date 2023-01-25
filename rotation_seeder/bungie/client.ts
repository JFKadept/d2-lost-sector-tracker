import { basename, join } from "https://deno.land/std@0.170.0/path/mod.ts";
import type {
  BungieAPIResponse,
  BungieManifest,
  DestinyActivityDefinition,
  DestinyActivityModeDefinition,
  DestinyActivityModifierDefinition,
  DestinyInventoryItemDefinition,
  DestinyJSONWorldContent,
} from "./types.d.ts";
import { DATA_DIRNAME } from "../constants.ts";
import { NetClient } from "../net/net_client.ts";

export class BungieClient {
  static #instance: NetClient;

  private constructor() {}

  static #getInstance() {
    if (!BungieClient.#instance) {
      BungieClient.#instance = new NetClient({
        headers: new Headers({
          "x-api-key": Deno.env.get("BUNGIE_API_KEY") ?? "",
        }),
        url: "https://bungie.net",
      });
    }

    return BungieClient.#instance;
  }

  static async #readFile<T>(filename: string) {
    const data = await Deno.readFile(join(DATA_DIRNAME, filename));
    return JSON.parse(new TextDecoder().decode(data)) as T;
  }

  static #getComponentDefinition<T>(
    manifest: BungieManifest,
    component: keyof DestinyJSONWorldContent,
    locale = "en",
  ) {
    const path = manifest.jsonWorldComponentContentPaths[locale][component];

    return this.#readFile<Record<string, T>>(basename(path)).catch(async () => {
      const { body } = await BungieClient.#getInstance().request<
        Record<string, T>
      >(path);
      return body;
    });
  }

  static getManifest(): Promise<BungieManifest> {
    return this.#readFile<BungieManifest>("Manifest.json").catch(async () => {
      const { body } = await BungieClient.#getInstance().request<
        BungieAPIResponse<BungieManifest>
      >("/platform/destiny2/manifest");
      return body.Response;
    });
  }

  static getActivities(manifest: BungieManifest, locale = "en") {
    return BungieClient.#getComponentDefinition<DestinyActivityDefinition>(
      manifest,
      "DestinyActivityDefinition",
      locale,
    );
  }

  static getActivityModes(manifest: BungieManifest, locale = "en") {
    return BungieClient.#getComponentDefinition<DestinyActivityModeDefinition>(
      manifest,
      "DestinyActivityModeDefinition",
      locale,
    );
  }

  static getModifiers(manifest: BungieManifest, locale = "en") {
    return BungieClient.#getComponentDefinition<
      DestinyActivityModifierDefinition
    >(manifest, "DestinyActivityModifierDefinition", locale);
  }

  static getInventoryItems(manifest: BungieManifest, locale = "en") {
    return BungieClient.#getComponentDefinition<DestinyInventoryItemDefinition>(
      manifest,
      "DestinyInventoryItemDefinition",
      locale,
    );
  }
}
