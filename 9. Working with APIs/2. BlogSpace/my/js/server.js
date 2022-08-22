const server = require('uWebSockets.js'),
	data = require('./data')

server
	.App()
	.get('/api/posts', (res, req) => {
		res
			.writeHeader('Content-Type', 'application/json')
			.writeHeader('Access-Control-Allow-Origin', '*')
			.writeHeader('Access-Control-Allow-Methods', 'GET, POST')
			.end(JSON.stringify(data))

	})
	.post('/api/posts/add', (res, req) => {
		const arr = []
		res.onData((chunk, isLast) => {
			arr.push(Buffer.from(chunk))
			if (isLast) {
				try {
					const body = Buffer.concat(arr)
					const decoder = new TextDecoder('utf-8')
					const sp = new URLSearchParams(decoder.decode(body))
					console.log('search params', sp)
					const post = JSON.parse(decoder.decode(body))
					data.unshift(post)
					res.writeHeader('Access-Control-Allow-Origin', '*')
						.writeHeader('Access-Control-Allow-Methods', 'GET, POSTS')
						.end()
				}
				catch {
					res.writeStatus('400 Bar Request')
				}
			}
		})
		res.onAborted(() => console.log('request aborted'))
	})
	.listen(80, flag => flag ? console.log('server running...') : console.log('error running server...'))