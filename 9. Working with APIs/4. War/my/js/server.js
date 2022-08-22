const { App } = require('uWebSockets.js'),
	{ readFileSync } = require('fs'),
	{ join } = require('path'),
	suits = ['hearts', 'spades', 'diamonds', 'crosses'],
	values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'],
	cardImgs = {},
	decks = {},
	createDeck = () => {
		maxDeckNumber++
		decks[maxDeckNumber] = []
		for (const suit of suits)
			for (const value of values)
				decks[maxDeckNumber].push([suit, value])
		return maxDeckNumber
	}

let maxDeckNumber = 0


App()
	.get('/card/:suit/:value', (res, req) => {
		const suit = req.getParameter(0),
			value = req.getParameter(1)
		if (suits.indexOf(suit) >= 0 && values.indexOf(value) >=0) return res
			.writeHeader('Content-Type', 'image/svg+xml')
			.writeHeader('Access-Control-Allow-Origin', '*')
			.writeHeader('Access-Control-Allow-Methods', 'get, post')
			.end(cardImgs[suit][value])

		res.writeStatus('404 Not Found')
			.writeHeader('Access-Control-Allow-Origin', '*')
			.writeHeader('Access-Control-Allow-Methods', 'get, post')
			.end('')
	})
	.get('/deck/new', (res, req) => {
		const number = createDeck()
		return res
			.writeHeader('Content-type', 'application/json')
			.writeHeader('Access-Control-Allow-Origin', '*')
			.writeHeader('Access-Control-Allow-Methods', 'get, post')
			.end(number.toString())
	})
	.get('/deck/:id/draw', (res, req) => {
		const deckId = +req.getParameter(0)
		if (!(deckId in decks))
			return res
				.writeStatus('404 Not Found')
				.writeHeader('Access-Control-Allow-Origin', '*')
				.writeHeader('Access-Control-Allow-Methods', 'get, post')
				.end(JSON.stringify({ error: 'Deck doesn\'t exist' }))

		const deck = decks[deckId]
		if (deck.length <= 1)
			return res
				.writeStatus('400 Bad Request')
				.writeHeader('Access-Control-Allow-Origin', '*')
				.writeHeader('Access-Control-Allow-Methods', 'get, post')
				.end(JSON.stringify({ error: 'Deck is empty' }))
		let randIndex
		randIndex = Math.floor(Math.random() * deck.length)
		const card1 = deck.splice(randIndex, 1)[0]
		randIndex = Math.floor(Math.random() * deck.length)
		const card2 = deck.splice(randIndex, 1)[0]
		return res
			.writeHeader('Access-Control-Allow-Origin', '*')
			.writeHeader('Access-Control-Allow-Methods', 'get, post')
			.end(JSON.stringify({
				card1,
				card2,
				remains: deck.length
			}))
	})
	.listen(80, flag => flag ? console.log('Server is working...') : console.log('Error starting server'))


for (const suit of suits) {
	for (const value of values) {
		if (!cardImgs[suit])
			cardImgs[suit] = {}
		cardImgs[suit][value] = readFileSync(join(__dirname, '..', `img/${suit}/${value}.svg`))

	}
}