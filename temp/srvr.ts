import http from 'node:http'
// import https from 'node:https'
import type { Handler } from '../src/types'

interface Options {
  port: number
  handler: Handler
}

function reqToRequest(
  req: http.IncomingMessage & { method: 'POST'; body: BodyInit },
): Request {
  let headers = new Headers()
  for (let key in req.headers) {
    if (req.headers[key]) headers.append(key, req.headers[key] as string)
  }
  let request = new Request(req.url, {
    method: req.method,
    body: req.method === 'POST' ? req.body : null,
    headers,
  })
  return request
}

export class HTTPServer {
  _port = 80
  _handler: Handler
  _server: http.Server
  constructor({ port, handler }: Options) {
    this._port = port
    this._handler = handler

    this._server = http.createServer(this.requestListener)
  }

  requestListener(req, res) {
    let request = reqToRequest(req)
    this._handler(request)
      .then((response) => {
        // Headers
        let responseHeaders = response.headers.entries()
        for (let [headerKey, headerValue] of responseHeaders) {
          res.setHeader(headerKey, headerValue)
        }
        // Status
        res.status(response.status)
        // Body
        res.write(response.body)
      })
      .catch((error) => {
        throw error
      })
  }

  serve() {
    this._server.listen(() => {
      console.log(`Listening on localhost:${this._port}`)
    })
  }
  close() {
    this._server.close()
  }
}

// export class HTTPSServer {
//   port = 443
//   handler: Handler
//   _server: https.Server
//   constructor({ port, handler }: Options) {
//     this.port = port
//     this.handler = handler
//   }

//   serve() {
//     // @TODO
//   }
// }
