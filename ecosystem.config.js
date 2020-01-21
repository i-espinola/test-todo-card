module.exports = {
	apps: [
		{
			name: 'APP Todo-card',
			script: './server/express.js',

			// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
			// time: true,
			// watch: true,
			// autorestart: true,
			// instances: 1,
			instances: 'max',
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

	// To auto deploy with PM2
	deploy: {
		production: {
			user: 'node',
			host: 'https://todo-cartoes.herokuapp.com/',
			ref: 'origin/master',
			repo: 'git@github.com/i-espinola/test-todo-card.git',
			path: '/build',
			'post-deploy':
				'npm install && pm2 reload ecosystem.config.js --env production',
		},
	},
}
