import { DestinyEntity } from "./DestinyEntity.ts"

export type DestinyActivity = DestinyEntity & {
    originalDisplayProperties: {
        description: string
        name: string
        icon: string
        hasIcon: boolean
    }
    selectionScreenDisplayProperties: {
        description: string
        name: string
        hasIcon: boolean
    }
    releaseIcon: string
    releaseTime: number
    completionUnlockHash: number
    activityLightLevel: number
    destinationHash: number
    placeHash: number
    activityTypeHash: number
    tier: number
    pgcrImage: string
    rewards: {
        rewardItems: {
            itemHash: number
            quantity: number
            hasConditionalVisibility: boolean
        }[]
    }[]
    modifiers: {
        activityModifierHash: number
    }[]
    isPlaylist: boolean
    challenges: []
    optionalUnlockStrings: []
    inheritFromFreeRoam: false
    suppressOtherRewards: false
    playlistItems: []
    matchmaking: {
        isMatchmade: boolean,
        minParty: number
        maxParty: number
        maxPlayers: number
        requiresGuardianOath: boolean
    },
    directActivityModeHash: number
    directActivityModeType: number
    loadouts: [],
    activityModeHashes: number[]
    activityModeTypes: number[]
    isPvP: boolean
    insertionPoints: []
    activityLocationMappings: {
        locationHash: number
        activationSource: string
        activityHash: number
    }[]
    hash: number
    index: number
    redacted: boolean
    blacklisted: boolean
}