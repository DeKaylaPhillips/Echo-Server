import net from 'net'

class Server {
  port: number
  host: string
  connectionMsg: string
  server: net.Server
  socket: net.Socket

  constructor (port: number, host: string) {
    this.port = port
    this.host = host
    this.connectionMsg = `TCP server at http://${this.host}:${this.port}/.`
  }

  openTCPConnection (): void {
    this.server = net.createServer((socket) => {
      this.socket = socket
      this.socket.write(
        'Connection established.\n\nPlease enter a message:\n\n'
      )
      this.socket.on('data', (data: Buffer) => {
        const message = data.toString().trim()
        console.log(`Client says...:\n\n${message}`)
        this.socket.end('Client connection closed.\n')
      })
    })
    this.server.on('connection', () => {
      console.log('Client has connected.\n')
    })
    this.server.listen(this.port, this.host, (): void => {
      console.log(this.connectionMsg)
    })
  }
}

export default Server
