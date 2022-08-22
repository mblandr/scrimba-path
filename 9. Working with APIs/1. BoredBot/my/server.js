const { resolveSoa } = require('dns')

require('http')
	.createServer(
		(req, res) => {
			console.log(req.url)
			if (req.url === '/api/activity')
				res
					.setHeader('Content-Type', 'application/json')
					.setHeader('Access-Control-Allow-Origin', '*')
					.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
					.end(JSON.stringify({
						message: 'no activity'
					}))
		}
	)
	.listen(80)
console.log('server started...');