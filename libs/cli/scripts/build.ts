import { build, emptyDir } from 'https://deno.land/x/dnt/mod.ts'

await emptyDir('./npm')

await build({
  entryPoints: [
    {
      kind: 'bin',
      name: 'srvr-rndr', // command name
      path: './cli.ts',
    },
  ],
  outDir: './npm',
  test: false,
  declaration: 'separate',
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    name: '@srvr-rndr/cli',
    version: Deno.args[0],
    description: 'Build tooling for srvr-rndr applications',
    author: 'Matt Hamlin <matthewjameshamlin@gmail.com>',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git@github.com:srvr-rndr/srvr-rndr.git',
      directory: '/libs/react',
    },
    bugs: {
      url: 'https://github.com/srvr-rndr/srvr-rndr/issues',
    },
  },
  compilerOptions: {
    lib: ['ES2022', 'DOM'],
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('README.md', 'npm/README.md')
    Deno.mkdirSync('npm/bin', { recursive: true })
    Deno.copyFileSync('bin/index.js', 'npm/bin/index.js')
  },
})
