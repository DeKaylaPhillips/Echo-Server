import Server from '../../src/server/server'
let hasMockClientConnected = false

jest.mock('net', () => {
  type MaybeNumber = number | undefined
  type MaybeString = string | undefined
  type MaybeVoidFunction = (() => void) | undefined
  type MaybeServerCallback = ((socket: any) => void) | undefined
  type StringOrUint8Arr = string | Uint8Array
  type WriteFunction = (data: StringOrUint8Arr) => boolean
  type SocketEventEmitter = (
    eventName: string,
    eventListener: (data: Buffer) => void
  ) => void
  type EndFunction = (
    buffer: StringOrUint8Arr,
    callback: MaybeVoidFunction
  ) => void

  class MockSocket {
    write: WriteFunction = jest.fn()
    end: EndFunction = jest.fn()
    on: SocketEventEmitter
    constructor () {
      this.on = (eventName, eventListener) => {
        if (eventName === 'data') {
          const data: Buffer = Buffer.from('Some test client data.')
          eventListener(data)
        }
      }
    }
  }

  return {
    createServer: (callBack: MaybeServerCallback) => {
      const socket = new MockSocket()
      if (hasMockClientConnected) {
        if (callBack === undefined) {
          return
        }
        callBack(socket)
      }

      return {
        listen: (
          port: MaybeNumber,
          host: MaybeString,
          callback: MaybeVoidFunction
        ): void => {
          if (callback === undefined) {
            return
          }
          callback()
        },
        on: (
          eventName: MaybeString,
          eventListener: VoidFunction
        ): void => {
          if (!hasMockClientConnected) {
            return
          } else if (eventListener === undefined) {
            return
          }
          eventListener()
        }
      }
    }
  }
})

describe('Server', () => {
  let server: Server
  let logMock: jest.SpyInstance
  const host: string = 'localhost'
  const port: number = 3000

  beforeEach(() => {
    server = new Server(port, host)
    hasMockClientConnected = false
    logMock = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    logMock.mockRestore()
  })

  test('logs a message when the TCP server is open for connections', () => {
    server.openTCPConnection()
    expect(logMock).toHaveBeenCalledTimes(1)
    expect(logMock).toHaveBeenCalledWith(
      `TCP server at http://${host}:${port}/.`
    )
  })

  test('logs a message when a TCP connection is established', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    expect(logMock).toHaveBeenCalledTimes(3)
    expect(logMock).toHaveBeenCalledWith('Client has connected.\n')
  })

  test('responds to a client connected to the TCP server', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    expect(server.socket.write).toHaveBeenCalled()
    expect(server.socket.write).toHaveBeenCalledWith(
      'Connection established.\n\nPlease enter a message:\n\n'
    )
  })

  test('logs a message when data is received from a client', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    expect(logMock).toHaveBeenCalledTimes(3)
    expect(logMock).toHaveBeenCalledWith(
      'Client says...:\n\nSome test client data.'
    )
  })

  test('closes a connection after a client writes to the server', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    expect(server.socket.write).toHaveBeenCalled()
    expect(server.socket.end).toHaveBeenCalled()
    expect(server.socket.end).toHaveBeenCalledWith(
      'Client connection closed.\n'
    )
  })
})
