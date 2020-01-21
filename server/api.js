// JSON server
// To run in production
const fs = require('fs')
const path = require('path')
const setup = require('./setup.js')
const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(
  path.join(setup.path, setup.api.file),
)

// Start Serve
server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(setup.api.endpoint, router)
server.listen(setup.api.port, () => {
	console.log('JSON Server is running')
})
