# Srvr Rndr

A minimal, React server rendering "framework" for web pages.

> Imagine RSC without client components (yet).

## Getting Started:

1. Install dependencies:

```sh
yarn add @srvr-rndr/react @srvr-rndr/cli
```

And react, react-dom...

2. Create an `index.tsx` file with the following contents:

```tsx
import React from 'react'
import {
  AppProps,
  FallbackProps,
  getReactRequestHandler,
} from '@srvr-rndr/react'

function App({ url }: AppProps) {
  return (
    <div>
      <marquee>App being served from: {url}</marquee>
    </div>
  )
}

function Fallback({ error }: FallbackProps) {
  return <pre>{JSON.stringify(error, null, 2)}</pre>
}

export default function handler(request: Request): Promise<Response> {
  return getReactRequestHandler({
    App,
    Fallback,
  })(request)
}
```

3. Configure your build step:

In your package.json:

```json
{
  "scripts": {
    "build": "srvr-rndr build"
  }
}
```

4. Configure Vercel and deploy:

Add a `vercel.json` file with the following contents:

```json
{
  "buildCommand": "yarn build"
}
```

Run `vercel build` and then `vercel deploy --prebuilt`!

## Inspiration / Thanks:

- Shout out to [Daishi (@dai_shi)](https://twitter.com/dai_shi) on twitter for
  the idea to tackle this in
  [this tweet](https://twitter.com/dai_shi/status/1670963177897742337)
- Deno and the deno ecosystem for making it so easy to work with modern JS/TS
  features without tooling overhead!
- Vercel for their Vercel Build API!

## Contributing:

This repo is using the following:

- `Deno`: ^1.35.0
- `Yarn`: ^3.5.0
- `Turbo`: 1.10.7

To get started, clone the repo then run `yarn` to install dependencies and setup
the monorepo.

From there you can run the tasks across all workspaced via `deno task <task>`,
the current available tasks are:

- `lint`
  - Example: `deno task lint`, will run lints across all workspaces
- `test`
  - Example: `deno task test`, will run tests across all workspaces
- `format`
  - Example: `deno task format`, will format all files within the monorepo
- `format:check`
  - Example: `deno task format:check`, will check the format of the files in the
    monorepo
- `build`
  - Example: `deno task build -- <version-number>`, will run builds acroass all
    workspaces
  - The `<version-number>` is required, and generates the latest version of the
    published packages
