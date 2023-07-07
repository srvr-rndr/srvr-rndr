import * as esbuild from "npm:esbuild";

await esbuild.build({
  entryPoints: ["src/index.tsx"],
  bundle: true,
  outdir: "dist",
  platform: "browser",
  conditions: ["edge-light", "edge"],
  format: "esm",
  jsx: "automatic",
  minify: true,
});

let output = `./.vercel/output`;

let funcs = `${output}/functions`;

try {
  Deno.removeSync("./.vercel", { recursive: true });
} catch (e) {
  // ignored
}

Deno.mkdirSync(`${funcs}/index.func`, { recursive: true });
Deno.copyFileSync("./dist/index.js", `${funcs}/index.func/index.js`);

let vcConfig = {
  runtime: "edge",
  entrypoint: "index.js",
};

let textEncoder = new TextEncoder();
let vcConfigEncoded = textEncoder.encode(JSON.stringify(vcConfig, null, 2));

Deno.writeFileSync(`${funcs}/index.func/.vc-config.json`, vcConfigEncoded);

let generalConfig = {
  version: 3,
};

let generalConfigEncoded = textEncoder.encode(
  JSON.stringify(generalConfig, null, 2),
);

Deno.writeFileSync(`${output}/config.json`, generalConfigEncoded);
