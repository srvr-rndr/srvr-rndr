# `@srvr-rndr/react`

A minimal, React server rendering "framework" for web pages.

## Installation:

```sh
yarn add @srvr-rndr/react
```

Note: You'll most likely need to use this in conjunction with `@srvr-rndr/cli`
to build and deploy your application!

## Usage:

```tsx
import {
  AppProps,
  FallbackProps,
  getReactRequestHandler,
} from "@srvr-rndr/react";

function App({ url }: AppProps) {
  return (
    <div>
      <marquee>App being served from: {url}</marquee>
    </div>
  );
}

function Fallback({ error }: FallbackProps) {
  return <pre>{JSON.stringify(error, null, 2)}</pre>;
}

// Some serverless function handler
export default function handler(request: Request): Promise<Response> {
  // `getReactRequestHandler` returns a request handler
  // which itself takes in a `Request` type and
  // returns a promise that resolves to a `Response`.
  return getReactRequestHandler({
    App,
    Fallback,
  })(request);
}
```

## Contributing:

TODO
