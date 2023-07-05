import React from 'https://esm.sh/react@canary'
import { getReactRequestHandler } from '../index.tsx'
import type { AppProps, FallbackProps } from '../react.tsx'
import { assertEquals } from 'https://deno.land/std@0.192.0/testing/asserts.ts'

function App({ url }: AppProps) {
  return <>{url}</>
}

function Fallback({ error }: FallbackProps) {
  return <>{error.message}</>
}

Deno.test('getReactRequestHandler - returns a request handler', async () => {
  let handler = getReactRequestHandler({ App, Fallback })

  assertEquals(typeof handler, 'function')

  let response = await handler(
    new Request('http://localhost:3000', {
      method: 'GET',
      headers: new Headers({
        'custom-header': 'foo',
      }),
    }),
  )

  if (!response.body) {
    throw new Error(`Didn't get a reasonable response!`)
  }

  assertEquals(await response.text(), 'http://localhost:3000/')
})

Deno.test(
  'getReactRequestHandler - renders fallback if an error occurs',
  async () => {
    let handler = getReactRequestHandler({
      App() {
        throw new Error('Catch me!')
      },
      Fallback,
    })

    assertEquals(typeof handler, 'function')

    let response = await handler(
      new Request('http://localhost:3000', {
        method: 'GET',
        headers: new Headers({
          'custom-header': 'foo',
        }),
      }),
    )

    if (!response.body) {
      throw new Error(`Didn't get a reasonable response!`)
    }

    assertEquals(await response.text(), 'Catch me!')
  },
)
