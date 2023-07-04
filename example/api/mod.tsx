import React from 'https://esm.sh/react@canary'
import {
  getReactRequestHandler,
  FallbackProps,
  AppProps,
} from 'https://esm.sh/@matthamlin/srvr@0.0.2'

function App({ url }: AppProps) {
  return (
    <div>
      {/* @ts-ignore-next-line */}
      <marquee>App being served from: {url}</marquee>
      <p style={{ fontWeight: 'bold' }}>{Deno.version.deno}</p>
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
