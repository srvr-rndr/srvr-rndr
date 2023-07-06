import React from 'react'
import {
  getReactRequestHandler,
  FallbackProps,
  AppProps,
} from '@srvr-rndr/react'

function App({ url }: AppProps) {
  return (
    <div>
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
