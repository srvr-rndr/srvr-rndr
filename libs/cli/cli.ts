import * as esbuild from 'npm:esbuild'

function cleanDir(path: string): void {
  try {
    Deno.removeSync(path, { recursive: true })
  } catch {
    // ignore
  }
}

interface BuildServerFunctionInput {
  /**
   * The name of the server function
   *
   * Also serves as the path that the function is exposed via
   * e.g. name: 'foo' -> example.com/foo handler
   */
  name: string
}

// @CLI_TODO: Handle multiple entrypoints
async function buildServerFunction({
  name,
}: BuildServerFunctionInput): Promise<void> {
  let path = `${Deno.cwd()}/app/${name}`

  await esbuild.build({
    entryPoints: [path.toString()],
    bundle: true,
    outdir: `./.vercel/output/functions/${name}.func`,
    platform: 'browser',
    conditions: ['edge-light', 'edge'],
    format: 'esm',
    jsx: 'automatic',
    minify: true,
  })
}

let output = `./.vercel/output`

let funcs = `${output}/functions`

cleanDir('./.vercel')

// @CLI_TODO: handle client side references somehow!
await buildServerFunction({
  name: 'index',
})

console.log(`Built server functions!`)

let vcConfig = {
  runtime: 'edge',
  entrypoint: 'index.js',
}

let textEncoder = new TextEncoder()
let vcConfigEncoded = textEncoder.encode(JSON.stringify(vcConfig, null, 2))

Deno.writeFileSync(`${funcs}/index.func/.vc-config.json`, vcConfigEncoded)

console.log(`Wrote server function config!`)

let generalConfig = {
  version: 3,
}

let generalConfigEncoded = textEncoder.encode(
  JSON.stringify(generalConfig, null, 2),
)

Deno.writeFileSync(`${output}/config.json`, generalConfigEncoded)

console.log(`Wrote top level vercel config!`)
