const esBuild = require("esbuild");

esBuild.build({
    entryPoints: ["./src/cdn.js"],
    outfile: "./index.js",
    bundle: true,
    platform: "browser",
    define: { CDN: true },
});

esBuild.build({
    entryPoints: ["./src/cdn.js"],
    outfile: "./index.min.js",
    bundle: true,
    minify: true,
    platform: "browser",
    define: { CDN: true },
});

esBuild.build({
    entryPoints: ["./src/module.js"],
    outfile: "./index.esm.js",
    bundle: true,
    platform: "neutral",
    mainFields: ["module", "main"],
});

esBuild.build({
    entryPoints: ["./src/module.js"],
    outfile: "./index.cjs.js",
    bundle: true,
    platform: "node",
    target: ["node10.4"],
});
