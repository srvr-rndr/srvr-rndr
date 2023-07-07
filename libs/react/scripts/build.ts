import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

if (!Deno.args[0]) {
  console.log(Deno.args);
  throw new Error(`No \`version\` provided to build command!

Re-run the command with a second argument of the version to build for!`);
}

await build({
  entryPoints: ["./src/index.tsx"],
  outDir: "./npm",
  test: false,
  declaration: "separate",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    name: "@srvr-rndr/react",
    version: Deno.args[0],
    description: 'A minimal, React server rendering "framework" for web pages',
    author: "Matt Hamlin <matthewjameshamlin@gmail.com>",
    license: "MIT",
    repository: {
      type: "git",
      url: "git@github.com:srvr-rndr/srvr-rndr.git",
      directory: "/libs/react",
    },
    bugs: {
      url: "https://github.com/srvr-rndr/srvr-rndr/issues",
    },
  },
  compilerOptions: {
    lib: ["ES2022", "DOM"],
  },
  mappings: {
    "https://esm.sh/react@canary": {
      name: "react",
      version: "canary",
      peerDependency: true,
    },
    "https://esm.sh/react-dom@canary/server": {
      name: "react-dom",
      version: "canary",
      peerDependency: true,
      subPath: "server",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync('LICENSE', 'npm/LICENSE')
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
