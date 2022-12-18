import {defineConfig} from "sanity"
import {deskTool} from "sanity/desk"
import {visionTool} from "@sanity/vision"
import {schemaTypes} from "./schemas"

export default defineConfig({
  name: "default",
  title: "Destiny 2 Lost Sector rotation",

  projectId: "iop3pi57",
  dataset: "production",

  plugins: [
    deskTool({
      structure: (S) => S.list()
        .title("Content")
        .items([
          S.documentListItem()
            .id("lostSectorRotation")
            .title("Rotation")
            .schemaType("lostSectorRotation"),
          S.divider(),
          ...S.documentTypeListItems().filter((item) => item.getId() !== "lostSectorRotation")
        ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
