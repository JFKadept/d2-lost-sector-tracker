export const lostSector = {
    name: "lostSector",
    title: "Lost Sector",
    type: "document",
    fields: [
        {
            name: "name",
            type: "string",
        },
        {
            name: "image",
            type: "url",
        },
        {
            name: "modifiers",
            type: "array",
            of: [{
                type: "reference",
                to: [{ type: "modifier" }]
            }]
        }
    ],
}