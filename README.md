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

## Overarching Goals:

1. Try to be as "Web-native" as possible

Meaning the framework will strive to leverage globals that are web-standard, for
example using native `Request` and `Response` built-ins, or using native
`globalThis.fetch` etc.

My hope is that the framework can be widely used because of this decision.

2. Make it work, make it easy to use, make it simple, then make it performant

It may seem odd to have performance be the fourth goal, but I'd rather have a
nice to use framework than something super brittle.

I want it to:

- work
  - It should do what it says it will do
- be easy to use
  - Someone should be able to pick up the concepts within the span of an hour
- be simple
  - Anyone should be able to understand the inner workings of the framework and
    contribute to it
- be performant
  - It should offer performant defaults

## Opinions:

While the intent with this project is to create a relatively un-opinionated
framework, it does have a few opinions that are documented here.

### Code for applications lives within an `app/` directory

Example directory structure:

```txt
your-app/
  app/
    index.tsx
    Feature.tsx
    utils.ts
```

### Aim for fewer, larger files

Most frameworks force separate files for different routes, Srvr Rndr does the
opposite. This is mainly because most of the application should live on the
server, and only a few features will run on the client.

### Config, if any, should be easy to understand and maintain

Several frameworks have combined config of features/routes within the source
code of the feature. This has some nice benefits but comes with the trade off of
being either oddly constraining, or includes additional complexity within the
framework itself.

At the moment I'm leaning towards maintaining config in a central place, that
can easily be imported / resolved without a transform at the framework level.

### Don't use this for complex applications

This might be a surprising thing to find on a project readme, but at the moment
I feel like the project wouldn't be suitable for any and all web applications,
instead I think it best serves fairly "simple" web pages (think a blog, or a
documentation site).

If you're building an e-commerce experience, you may want to consider
alternative solutions like Next.js!
