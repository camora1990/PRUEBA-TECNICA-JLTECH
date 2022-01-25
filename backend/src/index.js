require('dotenv').config()
const Server =require('./server/Server.js')

const server = new Server()

server.initServer()

