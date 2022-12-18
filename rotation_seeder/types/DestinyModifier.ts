import { DestinyEntity } from "./DestinyEntity.ts"

export type DestinyModifier = DestinyEntity<{
    iconSequences: { frames: string[] }[]
}> & {
    displayInNavMode: boolean
    displayInActivitySelection: boolean
}