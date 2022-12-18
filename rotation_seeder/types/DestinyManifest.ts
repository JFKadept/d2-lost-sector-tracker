import type { JSONWorldContent } from "./JSONWorldContent.ts"

export type DestinyManifest = {
    version: string
    mobileAssetContentPath: string
    mobileGearAssetDataBases: {
        version: number
        path: string
    }[]
    mobileWorldContentPaths: Record<string, string>
    jsonWorldContentPaths: Record<string, string>
    jsonWorldComponentContentPaths: Record<keyof JSONWorldContent, string>
    mobileClanBannerDatabasePath: string
    mobileGearCDN: {
        Geometry: string
        Texture: string
        PlateRegion: string
        Gear: string
        Shader: string
    },
    iconImagePyramidInfo: unknown[]
}