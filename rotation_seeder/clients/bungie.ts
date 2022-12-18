import { NetClient } from "./net_client.ts";

import type { DestinyManifest } from "../types/DestinyManifest.ts"
import type { BungieAPIResponse } from "../types/BungieApiResponse.ts";
import { JSONWorldContent } from "../types/JSONWorldContent.ts";

export class BungieClient extends NetClient {
    constructor() {
        super({
            baseURL: Deno.env.get("BUNGIE_BASE_URL"),
            headers: new Headers({
                "x-api-key": Deno.env.get("BUNGIE_API_KEY") ?? "",
            }),
            redirect: "follow",
        })
    }

    async getManifest() {
        const { body } = await this.get<BungieAPIResponse<DestinyManifest>>("/platform/destiny2/manifest")
        return body.Response
    }

    async getJSONWorldContent(locale: string) {
        const manifest = await this.getManifest()
        const { body } = await this.get<JSONWorldContent>(manifest.jsonWorldContentPaths[locale])
        return body
    }
}
