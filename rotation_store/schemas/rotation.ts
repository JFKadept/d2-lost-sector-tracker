export const rotation = {
    name: "rotation",
    title: "Lost Sector Rotation",
    type: "object",
    fields: [
        {
            name: "lostSectors",
            title: "Lost Sectors",
            type: "array",
            of: [{
                name: "rotationItem",
                type: "object",
                fields: [
                    {
                        name: "lostSector",
                        type: "reference",
                        to: [{ type: "lostSector" }],
                    },
                    {
                        name: "reward",
                        type: "reference",
                        to: [{ type: "rewardItem" }],
                    },
                    {
                        name: "active",
                        type: "boolean",
                        initialValue: false,
                    },
                    {
                        name: "activeOn",
                        type: "datetime",
                    }
                ],
            }],
        }
    ]
}