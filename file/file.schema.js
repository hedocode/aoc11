module.exports = {
    $id: "file",
    title: "file",
    type: "object",
    properties: {
        folderPath: { type: "string" },
        path: { type: "string" },
        name: { type: "string" },
        extension: { type: "string" },
        content: {
            anyOf: [
                { type: "object" },
                { type: "string" }
            ]
        },
    },
    required: ["folderPath"]
};