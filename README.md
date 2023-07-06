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
  getReactRequestHandler,
  FallbackProps,
  AppProps,
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
    "build": "srvr-rndr build",
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
