// server.js
const jsonServer = require('json-server')
const path = require('path')
const setup = require('./setup.js')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, './../database/db.json'))
const middlewares = jsonServer.defaults()
const fs = require('fs')


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/api', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.use(router)

server.listen(3030, () => {
	console.log('JSON Server is running')
})
