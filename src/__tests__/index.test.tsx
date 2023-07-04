import React from 'npm:react'
import { getReactRequestHandler } from '../index.tsx'
import type { AppProps, FallbackProps } from '../react.tsx'

function App({ url }: AppProps) {
  return <>{url}</>
}

function Fallback({ error }): FallbackProps {
  return <>{error.message}</>
}

Deno.test('getReactRequestHandler - returns a request handler', async () => {
  let handler = getReactRequestHandler({ App, Fallback })

  expect(typeof handler).toBe('function')

  let stream = await handler(
    new Request('http://localhost:3000', {
      method: 'GET',
      headers: new Headers({
        'custom-header': 'foo',
      }),
    }),
  )

  console.log(stream)
})
