import { DestinyEntity } from "./DestinyEntity.ts"

export type DestinyActivityMode = DestinyEntity & {
    pgcrImage: string
    modeType: number
    activityModeCategory: number
    isTeamBased: boolean
    tier: number
    isAggregateMode: boolean
    parentHashes: number[]
    friendlyName: string
    supportsFeedFiltering: boolean
    display: boolean
    order: number
}