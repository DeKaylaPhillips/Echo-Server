import net from 'net'

class Server {
  port: number
  host: string
  connectionMsg: string

  constructor (port: number, host: string) {
    this.port = port
    this.host = host
    this.connectionMsg = `TCP server at http://${this.host}:${this.port}/.`
  }

  openTCPConnection (): void {
    const server: net.Server = net.createServer()
    server.listen(this.port, this.host, (): void => {
      console.log(this.connectionMsg)
    })
  }
}

export default Server
