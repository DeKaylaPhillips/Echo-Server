import Server from '../../src/server/server'

jest.mock('net', () => {
  type MaybeNumber = number | undefined
  type MaybeString = string | undefined
  type MaybeVoidFunction = (() => void) | undefined

  return {
    createServer: () => (
      {
        listen: (
          port: MaybeNumber,
          host: MaybeString,
          callback: MaybeVoidFunction
        ): void => {
          if (callback === undefined) {
            return
          }
          callback()
        }
      }
    )
  }
})

describe('Server', () => {
  let server: Server
  let logMock: jest.SpyInstance
  const host: string = 'localhost'
  const port: number = 3000

  beforeEach(() => {
    server = new Server(port, host)
  })

  test('logs a message to the terminal when a connection establishes', () => {
    logMock = jest.spyOn(console, 'log').mockImplementation()
    server.openTCPConnection()
    expect(logMock).toHaveBeenCalledTimes(1)
    expect(logMock).toHaveBeenCalledWith(
      `TCP server at http://${host}:${port}/.`
    )
    logMock.mockRestore()
  })
})
