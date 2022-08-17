const rollBtn = document.querySelector('.btn-roll'),
	chanceBtn = document.querySelector('.btn-chance'),
	gameEl = document.querySelector('.game'),
	headerEl = gameEl.querySelector('h1'),
	total1El = gameEl.querySelector('.total-1'),
	total2El = gameEl.querySelector('.total-2'),
	current1El = gameEl.querySelector('.current-1'),
	current2El = gameEl.querySelector('.current-2'),
	maxScore = 20,
	resetGame = () => {
		headerEl.textContent = 'Player 1 Turn'
		gameState = {
			started: false,
			finished: false,
			firstPlayer: true,
		}
		scores = {
			total1: 0,
			total2: 0,
			current1: 0,
			current2: 0,
		}
		renderUI()
	},
	renderUI = () => {
		total1El.textContent = `score: ${scores.total1}`
		total2El.textContent = `score: ${scores.total2}`
		current1El.textContent = scores.current1
		current2El.textContent = scores.current2
		if (gameState.firstPlayer) {
			current1El.classList.add('active')
			current2El.classList.remove('active')
		}
		else {
			current1El.classList.remove('active')
			current2El.classList.add('active')
		}
		rollBtn.textContent = 'roll dice 🎲'
		if (gameState.finished) {
			if (scores.total1 > scores.total2)
				headerEl.textContent = 'player 1 won'
			else if (scores.total1 < scores.total2)
				headerEl.textContent = 'player 2 won'
			else
				headerEl.textContent = 'draw'
			rollBtn.textContent = 'reset game 🧿'
		} else {
			headerEl.textContent = `player ${gameState.firstPlayer ? 1 : 2} turn`
			if (!gameState.started) {
				current1El.textContent = current2El.textContent = '-'
			}

		}
		chanceBtn.disabled = gameState.finished || !gameState.started
	},
	roll = (tryLuck = false) => {
		console.log('calling', tryLuck)

		if (gameState.finished) {
			gameState.started = false
			gameState.finished = false
			resetGame()
			return
		}
		gameState.started = true
		let roll = Math.floor(Math.random() * 6) + 1

		if (tryLuck) {
			const luck = Math.random() > 0.5
			if (luck)
				alert('You are lucky!')
			roll = luck ? 2 * roll : 0
		}
		else
			roll = Math.floor(Math.random() * 6) + 1

		if (gameState.firstPlayer) {
			scores.current1 = roll
			scores.total1 += scores.current1
		}
		else {
			scores.current2 = roll
			scores.total2 += scores.current2
		}
		if (Math.max(scores.total1, scores.total2) >= maxScore)
			gameState.finished = true
		if (!gameState.finished)
			gameState.firstPlayer = !gameState.firstPlayer
		renderUI()
	},
	tryLuck = () => {

	}




let gameState = {
	started: false,
	finished: false,
	firstPlayer: true
}, scores = {
	total1: 0,
	total2: 0,
	current1: 0,
	current2: 0,
}

rollBtn.addEventListener('click', () => roll())
chanceBtn.addEventListener('click', () => roll(true))
resetGame()

