import Server from '../../src/server/server'
let hasMockClientConnected = false

jest.mock('net', () => {
  type OptNumber = number | undefined
  type OptString = string | undefined
  type OptVoidFunction = VoidFunction | undefined
  type OptStringOrByteArr = string | Uint8Array
  type OptServerCb = ((socket: any) => void) | undefined
  type WriteFunction = (data: OptStringOrByteArr) => boolean
  type SocketEventEmitter = (
    eventName: string,
    eventListener: (data: Buffer) => void
  ) => void
  type EndFunction = (
    buffer: OptStringOrByteArr,
    callback: OptVoidFunction)
  => void

  class MockSocket {
    write: WriteFunction = jest.fn()
    end: EndFunction = jest.fn()
    on: SocketEventEmitter = (eventName, eventListener) => {
      if (eventName === 'data') {
        const data: Buffer = Buffer.from('Some test client data.')
        eventListener(data)
      };
    }
  };

  return {
    createServer: (callBack: OptServerCb) => {
      const socket = new MockSocket()
      if (hasMockClientConnected && callBack !== undefined) {
        callBack(socket)
      };

      return {
        listen: (
          port: OptNumber,
          host: OptString,
          callback: OptVoidFunction
        ): void => {
          if (callback !== undefined) {
            callback()
          };
        }
      }
    }
  }
})

describe('Server', () => {
  let server: Server
  const host: string = 'localhost'
  const port: number = 3000

  beforeEach(() => {
    server = new Server(port, host)
    hasMockClientConnected = false
  })

  test('logs a message when the TCP server is open for connections', () => {
    const logMock: jest.SpyInstance = jest.spyOn(console, 'log')
      .mockImplementation()
    server.openTCPConnection()
    expect(logMock).toHaveBeenCalled()
    expect(logMock).toHaveBeenCalledWith(
      `TCP server at http://${host}:${port}/.`
    )
    logMock.mockRestore()
  })

  test('responds to a client when a TCP connection is established', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    expect(server.socket.write).toHaveBeenCalledWith(
      'Connection established.\n\nPlease enter a message:\n\n'
    )
  })

  test('allows a client to write to the TCP server', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    server.socket.on('data', (clientData) => {
      const clientMessage: string = clientData.toString().trim()
      expect(clientMessage).toBe('Some test client data.')
    })
  })

  test('closes a connection after a client writes to the server', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    expect(server.socket.end).toHaveBeenCalledWith(
      '\nClient connection closed.\n'
    )
  })

  test('echoes the data received from a client', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    server.socket.on('data', () => {
      expect(server.socket.write).toHaveBeenCalledWith(
        '\nServer received: Some test client data.\n'
      )
    })
  })
})
