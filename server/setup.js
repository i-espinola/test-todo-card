const setup = {
	api: {
		path: process.env.INIT_CWD || __dirname,
		db: '/db.json',
		dir: '/database',
		endPoint: '/api',
		portApi: process.env.PORT || 5000,
		bannerApi: '\nJSON Server on\nPort: ',
	},
	path: process.env.INIT_CWD || __dirname,
	file: '/index.html',
	public: '/build',
	request: '/*',
	port: process.env.PORT || 3000,
	banner: '\nExpress server run\nPort: ',
	favicon: '/build/favicon.ico',
}

module.exports = setup
