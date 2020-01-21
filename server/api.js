// JSON server
// To run in production
const setup = require('./setup')
const path = require('path')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const api = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(
	path.join(setup.api.path, setup.api.dir, setup.api.db),
)

api.use(middlewares)
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))

api.use(setup.api.endPoint, router)
api.listen(setup.api.portApi, () => {
	console.log(`${setup.api.bannerApi}\n Port:' ${setup.api.portApi}`)
})
