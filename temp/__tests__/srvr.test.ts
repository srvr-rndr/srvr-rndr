import { HTTPServer } from '../srvr'

test.skip('HTTPServer - creates a server', async () => {
  let port = 3000

  let server = new HTTPServer({
    port,
    async handler(req) {
      expect(req.headers.has('custom-header')).toBe(true)
      return new Response('Yo', {
        headers: new Headers({ 'Content-Type': 'text/html' }),
        status: 202,
      })
    },
  })
  server.serve()

  await Promise.resolve()

  try {
    let res = await fetch(`http://localhost:${port}`, {
      headers: new Headers({
        'custom-header': 'yo-yo',
      }),
    })

    let content = await res.text()

    expect(content).toBe('Yo')
  } catch (e) {
    console.log(e)
    throw e
  } finally {
    server.close()
  }
})
