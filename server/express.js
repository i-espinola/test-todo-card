// Express server
// To run in production
const favicon = require('express-favicon')
const setup = require('./setup.js')
const express = require('express')
const http = require('http')
const path = require('path')
const app = express()

app.use(favicon(setup.path + setup.favicon))
app.use(express.static(setup.path))
app.use(express.static(path.join(setup.path, setup.public)))
app.get(setup.request, (req, res) => {
	res.sendFile(path.join(setup.path, setup.public, setup.file))
})

// Start Serve
const server = http.createServer(app)
server.listen(setup.port, () => {
	console.log(setup.banner + setup.port)
})
