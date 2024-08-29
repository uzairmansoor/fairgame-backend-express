module.exports = {
    apps: [
        {
            name: "fairgame-backend",
            script: "src/index.js",
            time: true,
            env: {
                "NODE_ENV": "development",
            }
        }
    ]
}