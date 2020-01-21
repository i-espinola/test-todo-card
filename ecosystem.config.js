module.exports = {
	apps: [
		{
			name: 'APP Todo-card',
			script: './server/express.js',
			// time: true,
			// watch: true,
			// instances: "max",
			// autorestart: true,
			instances: 1,
			max_memory_restart: '512M',

			// LOGS
			log_file: './server/logs/combined.log',
			env: {
			  NODE_ENV: "development",
			},
			env_production: {
			  NODE_ENV: "production",
			}
		},
	],
}
