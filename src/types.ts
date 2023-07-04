export type Handler = (request: Request) => Promise<Response>

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
