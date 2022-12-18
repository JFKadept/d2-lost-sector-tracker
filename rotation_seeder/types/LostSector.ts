import { Modifier } from "./Modifier.ts";

export type LostSector = {
    id: number
    name: string
    modifiers: Modifier[]
    image: string
}