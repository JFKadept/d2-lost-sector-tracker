export type DestinyModifier = {
    displayProperties: {
        description: string
        name: string
        icon: string
        iconSequences: { frames: string[] }[]
        hasIcon: boolean
    }
    displayInNavMode: boolean
    displayInActivitySelection: boolean
    hash: number
    index: number
    redacted: boolean
    blacklisted: boolean
}