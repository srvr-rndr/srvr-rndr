import React from 'https://esm.sh/react@canary'
import {
  renderToReadableStream,
  renderToString,
} from 'https://esm.sh/react-dom@canary/server'
import type { Handler, Options } from './types.ts'

export default function getReactRequestHandler({
  App,
  onError,
  Fallback,
}: Options): Handler {
  return async function handleRequest(request: Request): Promise<Response> {
    let url = request.url

    try {
      let stream = await renderToReadableStream(<App url={url} />, {
        onError(error: unknown, errorInfo: unknown) {
          if (typeof onError === 'function') {
            onError(error, errorInfo)
          }
        },
      })

      return new Response(stream, {
        status: 200,
      })
    } catch (e) {
      if (typeof onError === 'function') {
        onError(e)
      }
      return new Response(renderToString(<Fallback error={e} />), {
        status: 500,
      })
    }
  }
}
