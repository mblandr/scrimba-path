let cards = [],
	card = [],
	deck = [],
	results = {},
	score = 0,
	totalScore,
	started = false,
	timer

const
	unicodeStarts = [0x1f0a1, 0x1f0b1, 0x1f0d1, 0x1f0c1],
	suits = ['swords', 'hearts', 'clubs', 'diamonds'],
	values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', null, 'queen', 'king'],
	msgEl = document.querySelector('.msg'),
	cardsEl = document.querySelector('.cards'),
	scoreEl = document.querySelector('.score span'),
	totalScoreEl = document.querySelector('.total-score span'),
	startBtn = document.querySelector('.start'),
	newCardBtn = document.querySelector('.new-card'),
	populateDeck = () => {
		deck = []
		suits.forEach(suit => {
			values.forEach(value => value && deck.push([suit, value]))
		})
	},
	pickRandomCard = () => {
		const index = Math.floor((Math.random() * deck.length))
		const card = deck[index]
		deck = deck.filter((_, i) => index !== i)
		return card
	},
	getCardSymbol = card => {
		let index = suits.indexOf(card[0])
		let codePoint = unicodeStarts[index]
		index = values.indexOf(card[1])
		codePoint += index
		return `&#x${codePoint.toString(16).toUpperCase()};`
	},
	countScoreByAce = (cards, isAceAs1 = false) => cards.reduce((score, card) => {

		let value = Math.min(values.indexOf(card[1]) + 1, 10)
		if (card[1] === 'ace' && !isAceAs1)
			value = 11
		return score + value
	}, 0),
	countScore = () => {
		let result = countScoreByAce(cards)
		if (result > 21)
			result = countScoreByAce(cards, true)
		return result

	},
	clearCards = () => {
		cardsEl.textContent = ''
	},
	updateBtns = () => {
		startBtn.disabled = started
		newCardBtn.disabled = !started
	},
	updateScore = () => {
		score = countScore()

		if (score >= 21) {
			started = false
			if (score === 21)
				totalScore[0]++
			else
				totalScore[1]++
		}
	},
	renderGame = () => {
		scoreEl.textContent = score
		totalScoreEl.textContent = `${totalScore[0]}:${totalScore[1]}`
		if (!started && score === 0)
			msgEl.textContent = 'Want to play a round?'
		else if (score < 21)
			msgEl.textContent = 'Do you want to draw a new card?'
		else if (score == 21)
			msgEl.textContent = 'Wohoo! Your\'ve got a BlackJack!'
		else
			msgEl.textContent = 'You loose!'
		if (score >= 21)
			timer = setTimeout(() => {
				msgEl.textContent = 'Want to play a round?'
			}, 3000)

	},
	addCard = () => {
		const card = pickRandomCard()
		cards.push(card)
		const span = document.createElement('span')
		span.innerHTML = getCardSymbol(card)
		cardsEl.appendChild(span)
	},
	makeStep = (num) => {
		if (!num)
			num = 1
		for (let i = 1; i <= num; i++)
			addCard()
		updateScore()
		renderGame()
		updateBtns()
	},
	initGame = () => {
		clearInterval(timer)
		clearCards()
		started = true
		cards = []
		populateDeck()
	}

startBtn.addEventListener('click', () => {
	while (true) {
		let userName = prompt('Enter a user name')
		if (!userName || !userName.trim()) continue
		userName = userName.trim().toLowerCase()
		if (!results[userName])
			results[userName] = [0, 0]
		totalScore = results[userName]
		break
	}
	initGame()
	makeStep(2)
})

newCardBtn.addEventListener('click', () => makeStep())

