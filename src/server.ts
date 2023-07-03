import net from 'node:net'

const port: number = 3000
const host: string = 'localhost'

const server = net.createServer((socket: net.Socket): void => {})

server.listen(port, host, (): void => {
  console.log(`TCP server has established a connection at http://${host}:${port}/.`)
})
