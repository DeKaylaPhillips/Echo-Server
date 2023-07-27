import type net from 'net'

class ClientHandler {
  socket: net.Socket

  constructor (socket: net.Socket) {
    this.socket = socket
  }

  handleClientData (): void {
    this.writeData()
    this.readData()
  }

  private writeData (): void {
    this.socket.write(
      'Connection established.\n\nPlease enter a message:\n\n'
    )
  }

  private readData (): void {
    this.socket.on('data', (data: Buffer) => {
      this.socket.write(`\nServer received: ${data.toString().trim()}\n`)
      this.socket.end('\nClient connection closed.\n')
    })
  }
}

export default ClientHandler
