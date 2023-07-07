import Server from '../../src/server/server'
jest.mock('net', () => ({ createServer: () => ({ listen: (port: number | undefined, host: string | undefined, callback: (() => void) | undefined) => { if (callback != null) { callback() } } }) }))

describe('Console', () => {
  test('called to log a message to the terminal when TCP connections are established', () => {
    const logMock: jest.SpyInstance = jest.spyOn(console, 'log').mockImplementation()
    const host: string = 'localhost'
    const port: number = 3000
    const server: Server = new Server(port, host)
    server.openTCPConnection()
    expect(logMock).toHaveBeenCalledTimes(1)
    expect(logMock).toHaveBeenCalledWith(`TCP server has established a connection at http://${host}:${port}/.`)
    logMock.mockRestore()
  })
})
