const esBuild = require("esbuild");

esBuild.build({
    entryPoints: ["./src/cdn.js"],
    outfile: "./dist/index.js",
    bundle: true,
    platform: "browser",
});

esBuild.build({
    entryPoints: ["./src/cdn.js"],
    outfile: "./dist/index.min.js",
    bundle: true,
    minify: true,
    platform: "browser",
});

esBuild.build({
    entryPoints: ["./src/module.js"],
    outfile: "./dist/index.mjs",
    bundle: true,
    platform: "neutral",
    mainFields: ["module", "main"],
});

esBuild.build({
    entryPoints: ["./src/module.js"],
    outfile: "./dist/index.cjs",
    bundle: true,
    platform: "node",
    target: ["node10.4"],
});
