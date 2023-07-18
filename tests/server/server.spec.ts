import Server from '../../src/server/server'

let hasMockClientConnected = false

jest.mock('net', () => {
  type MaybeNumber = number | undefined
  type MaybeString = string | undefined
  type MaybeVoidFunction = (() => void) | undefined
  type SocketCallback = ((socket: any) => void) | undefined

  class MockSocket {
    write: (
      data: string | Uint8Array
    ) => boolean = jest.fn()
  }

  return {
    createServer: (callBack: SocketCallback) => {
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
    expect(logMock).toHaveBeenCalledTimes(2)
    expect(logMock).toHaveBeenCalledWith('Client has connected.')
  })

  test('responds to a client connected to the TCP server', () => {
    hasMockClientConnected = true
    server.openTCPConnection()
    expect(server.socket.write).toHaveBeenCalled()
    expect(server.socket.write).toHaveBeenCalledWith('Connection established.')
  })
})
