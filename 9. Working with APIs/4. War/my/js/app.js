

const
	statusEl = document.querySelector('.status'),
	remainsEl = document.querySelector('.remains span'),
	compScoreEl = document.querySelector('.score-comp span'),
	myScoreEl = document.querySelector('.score-my span'),
	compCardEl = document.querySelector('#comp-img'),
	myCardEl = document.querySelector('#my-img'),
	newDeckBtn = document.querySelector('.new-deck'),
	drawCardBtn = document.querySelector('.draw-card'),
	values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'],
	statuses = {
		notStarted: 0,
		started: 1,
		drowned: 2,
		finished: 3

	},
	winners = {
		me: 0,
		comp: 1,
		zero: 2
	},
	baseUrl = 'http://localhost/',
	initialState = {
		score: {
			comp: 0,
			my: 0
		},
		winnerAfterDraw: winners.zero,
		cards: {
			comp: [],
			my: []
		},
		remains: 0,
		status: statuses.notStarted
	},

	renderGameState = () => {

		if (gameState.status === statuses.notStarted) {
			statusEl.textContent = 'Game not started'
			drawCardBtn.disabled = true
		} else if (gameState.status === statuses.started) {
			statusEl.textContent = 'Draw first card'
			drawCardBtn.disabled = false
		} else if (gameState.status === statuses.finished) {
			if (gameState.score.my > gameState.score.comp)
				statusEl.textContent = 'I won!'
			else if (gameState.score.my < gameState.score.comp)
				statusEl.textContent = 'Computer won'
			else
				statusEl.textContent = 'Nobody won, dead heat'
			drawCardBtn.disabled = true
		} else if (gameState.status === statuses.drowned) {
			switch (gameState.winnerAfterDraw) {
				case winners.comp:
					statusEl.textContent = 'Computer win this draw!'
					break
				case winners.me:
					statusEl.textContent = 'I win this draw!'
					break
				default:
					statusEl.textContent = 'Dead heat in this draw'
			}
		}
		remainsEl.textContent = gameState.remains
		compScoreEl.textContent = gameState.score.comp
		myScoreEl.textContent = gameState.score.my
		let card = gameState.cards.my
		myCardEl.innerHTML = card.length ? `<img src="${baseUrl}card/${card.join('/')}" >` : ''
		card = gameState.cards.comp
		compCardEl.innerHTML = card.length ? `<img src="${baseUrl}card/${card.join('/')}" >` : ''

	},

	newDeck = () => {
		return new Promise(
			resolve => {
				Object.assign(gameState, initialState)
				gameState.cards.my = gameState.cards.comp = []
				fetch(`${baseUrl}deck/new`)
					.then(res => {
						if (!res.ok) {
							throw new Error(res.statusText)
						}
						return res.json()
					})
					.then(data => {

						gameState.status = statuses.started

						deckId = +data
						resolve()
					})
					.catch(e => {
						alert(e.message)
						resolve()
					})
			}
		)

	},

	drawCard = () => {
		return new Promise(
			resolve => {
				if (gameState.status === statuses.started || gameState.status === statuses.drowned)
					fetch(`${baseUrl}deck/${deckId}/draw`)
						.then(res => {
							if (!res.ok) {
								if (res.status === 400)
									gameState.status = statuses.finished
								else
									throw new Error(res.statusText)
							}
							return res.json()
						})
						.then(data => {

							gameState.cards.comp = data.card1
							gameState.cards.my = data.card2
							gameState.status = statuses.drowned
							if (values.indexOf(data.card1[1]) < values.indexOf(data.card2[1])) {
								gameState.score.my++
								gameState.winnerAfterDraw = winners.me
							}
							else if (values.indexOf(data.card1[1]) > values.indexOf(data.card2[1])) {
								gameState.score.comp++
								gameState.winnerAfterDraw = winners.comp
							}
							else
								gameState.winnerAfterDraw = winners.zero

							gameState.remains = data.remains
							if (data.remains === 0)
								gameState.status = statuses.finished
							resolve()

						})
						.catch(e => {
							alert(e.message)
							resolve()
						})

			}
		)


	}


let deckId,
	gameState = initialState

newDeckBtn.addEventListener('click', () => {
	newDeck()
		.then(renderGameState)
})


drawCardBtn.addEventListener('click', () => {
	drawCard().then(renderGameState)
})

renderGameState()