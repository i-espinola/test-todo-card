module.exports = {
	apps: [
		{
			name: 'APP Todo-card',
			script: './server/express.js',

			// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
			instances: 1,
			max_memory_restart: '512M',

			// LOGS
			log_file: './server/logs/combined.log',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
}
