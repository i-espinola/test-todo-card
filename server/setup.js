const setup = {
	path: process.env.INIT_CWD || __dirname,
	file: '/index.html',
	public: '/build',
	request: '/*',
	port: process.env.PORT || 3000,
	banner: '\nExpress server run\nPort: ',
	favicon: '/build/favicon.ico',
}

module.exports = setup
