export type DestinyEntity<D = Record<never, never>> = {
    displayProperties: D & {
        description: string
        name: string
        icon: string
        hasIcon: boolean
    }
    hash: number
    index: number
    redacted: boolean
    blacklisted: boolean
}