import React from 'react'
import {
  AppProps,
  FallbackProps,
  getReactRequestHandler,
} from '@srvr-rndr/react'

function App({ url }: AppProps) {
  return (
    <div>
      <h1>Hello World!</h1>
      {/* @ts-expect-error */}
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
