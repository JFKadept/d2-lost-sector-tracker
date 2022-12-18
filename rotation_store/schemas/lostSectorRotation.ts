export const lostSectorRotation = {
    name: "lostSectorRotation",
    title: "Lost Sector Rotation",
    type: "object",
    fields: [
        {
            name: "rotation",
            title: "Rotation",
            type: "array",
            of: [{
                name: "day",
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
                ],
            }],
        }
    ]
}