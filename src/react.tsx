import React from 'https://esm.sh/react@canary'
import {
  renderToString,
  renderToReadableStream,
} from 'https://esm.sh/react-dom@canary/server'
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
  onError?: (error: unknown, errorInfo?: unknown) => void
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
        onError(error: unknown, errorInfo) {
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
