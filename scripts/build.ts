import { build, emptyDir } from 'https://deno.land/x/dnt/mod.ts'

await emptyDir('./npm')

await build({
  entryPoints: ['./src/index.tsx'],
  outDir: './npm',
  test: false,
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: '@matthamlin/srvr',
    version: Deno.args[0],
    description: 'A simple React server rendering handler',
    author: 'Matt Hamlin <matthewjameshamlin@gmail.com>',
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git@github.com:hamlim/srvr.git',
    },
    bugs: {
      url: 'https://github.com/hamlim/srvr/issues',
    },
  },
  compilerOptions: {
    lib: ['ES2022', 'DOM'],
  },
  mappings: {
    'https://esm.sh/react@canary': {
      name: 'react',
      version: 'canary',
      peerDependency: true,
    },
    'https://esm.sh/react-dom@canary/server': {
      name: 'react-dom',
      version: 'canary',
      peerDependency: true,
      subPath: 'server',
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    // Deno.copyFileSync('LICENSE', 'npm/LICENSE')
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
