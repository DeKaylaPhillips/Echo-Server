import Server from '../server/server'

const server: Server = new Server(3000, 'localhost')
server.openTCPConnection()
