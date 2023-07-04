import React from 'npm:react'
import { renderToString, renderToReadableStream } from 'npm:react-dom/server'
import type { Handler } from './types.ts'

export interface AppProps {
  url: string
}

export interface FallbackProps {
  error: Error
}

export interface Options {
  App: React.FC<AppProps>
  Fallback: React.FC<FallbackProps>
  onError?: (err: Error) => void
}

export default function getReactRequestHandler({
  App,
  onError,
  Fallback,
}: Options): Handler {
  return async function handleRequest(request: Request): Promise<Response> {
    let url = request.url

    try {
      let stream = await renderToReadableStream(<App url={url} />, {
        onError(error: Error) {
          if (typeof onError === 'function') {
            onError(error)
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
