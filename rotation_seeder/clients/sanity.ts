import type { LostSector } from "../types/LostSector.ts";
import type { Modifier } from "../types/Modifier.ts";
import type { Reward } from "../types/Reward.ts";
import type { SanityMutationResponse } from "../types/SanityMutationResponse.ts"
import { NetClient } from "./net_client.ts";

type SanityMutationParams = Partial<{
    dryRun: boolean
    returnDocuments: boolean
    returnIds: boolean
    visibility: "sync" | "async" | "deferred"
}>

export class SanityClient extends NetClient {
    constructor() {
        super({
            baseURL: `${Deno.env.get("SANITY_BASE_URL")}/v2021-10-21`,
            headers: new Headers({
                authorization: `Bearer ${Deno.env.get("SANITY_API_KEY")}`
            }),
        })
    }

    private getRandomKey() {
        return [...new Uint8Array(crypto.getRandomValues(new Uint8Array({ length: 6 })))]
            .map((b) => b.toString(32)).join("")
    }

    async seedData(rewards: Reward[], modifiers: Modifier[], lostSectors: LostSector[], cfg?: SanityMutationParams) {
        const params = new URLSearchParams(
            Object.entries({
                ...(cfg ?? {}),
                // visibility: "deferred"
            } as SanityMutationParams).map(([key, value]) => [key, value.toString()])
        )

        const reqBody = JSON.stringify({
            mutations: [
                ...rewards.map((reward) => ({
                    createOrReplace: {
                        _id: reward.id.toString(),
                        _type: "rewardItem",
                        name: reward.name,
                        icon: reward.icon,
                    },
                })),
                ...modifiers.map((modifier) => ({
                    createOrReplace: {
                        _id: modifier.id.toString(),
                        _type: "modifier",
                        name: modifier.name,
                        description: modifier.description,
                        icon: modifier.icon,
                    },
                })),
                ...lostSectors.map((lostSector) => ({
                    createOrReplace: {
                        _id: lostSector.id.toString(),
                        _type: "lostSector",
                        name: lostSector.name,
                        image: lostSector.image,
                        modifiers: lostSector.modifiers.map((modifier) => ({
                            _key: this.getRandomKey(),
                            _type: "reference",
                            _ref: modifier.id.toString()
                        })),
                    }
                }))
            ]
        })

        const { body } = await this.post<SanityMutationResponse>("/data/mutate/production", {
            params,
            headers: new Headers({
                "content-type": "application/json",
            }),
            body: reqBody
        })

        return body
    }
}