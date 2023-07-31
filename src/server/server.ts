import net from 'net'
import ClientHandler from './clientHandler'
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
    this.server = net.createServer((socket: net.Socket) => {
      this.socket = socket
      const connection: ClientHandler = new ClientHandler(this.socket)
      connection.handleClientData()
    }).listen(this.port, this.host, (): void => {
      console.log(this.connectionMsg)
    })
  }
}

export default Server
