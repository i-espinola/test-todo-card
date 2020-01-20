module.exports = {
	apps: [
		{
			name: 'APP Todo-card',
			script: './server/express.js',

			// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
			// instances: 1,
			// time: true,
			// watch: true,
			instances: 'max',
			autorestart: true,
			// max_memory_restart: '512M',

			// LOGS
			log_file: './server/logs/combined.log',

			// Envs
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
		// {
		// 	name: 'api-app',
		// 	script: './server/api.js',
		// 	instances: 1,
		// 	exec_mode: 'cluster',
		// },
	],

	// To auto deploy with PM2
	deploy: {
		production: {
			user: 'node',
			host: '212.83.163.1',
			ref: 'origin/master',
			repo: 'git@github.com/i-espinola/test-todo-card.git',
			path: '/build',
			'post-deploy':
				'npm install && pm2 reload ecosystem.config.js --env production',
		},
	},
}
