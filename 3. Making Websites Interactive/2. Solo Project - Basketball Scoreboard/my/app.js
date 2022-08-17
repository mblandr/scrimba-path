let timer = 0,
	currentScore = [0, 0]
const totalScore = [0, 0],
	duration = 10,

	firstScoreEl = document.querySelector('.score-first'),
	secondScoreEl = document.querySelector('.score-second'),
	btnAddFirst1 = document.querySelector('.add-first1'),
	btnAddFirst2 = document.querySelector('.add-first2'),
	btnAddFirst3 = document.querySelector('.add-first3'),
	btnAddSecond1 = document.querySelector('.add-second1'),
	btnAddSecond2 = document.querySelector('.add-second2'),
	btnAddSecond3 = document.querySelector('.add-second3'),
	btnPlay = document.querySelector('.play'),
	timerEl = document.querySelector('.timer'),
	totalScoreEl1 = document.querySelector('.total1'),
	totalScoreEl2 = document.querySelector('.total2'),
	updateCurrent = () => {
		firstScoreEl.textContent = currentScore[0]
		secondScoreEl.textContent = currentScore[1]
	},
	updateTotal = () => {
		totalScoreEl1.textContent = totalScore[0]
		totalScoreEl2.textContent = totalScore[1]
	},
	updateTimer = () => timerEl.textContent = '0:' + (timer > 9 ? timer : '0' + timer),
	updateButtons = () => {
		btnAddSecond1.disabled = btnAddSecond2.disabled = btnAddSecond3.disabled = btnAddFirst3.disabled = btnAddFirst2.disabled = btnAddFirst1.disabled = timer === 0
		btnPlay.disabled = timer > 0
	},
	updateHighlight = () => {
		if (currentScore[0] < currentScore[1]) {
			secondScoreEl.classList.add('winner')
			firstScoreEl.classList.remove('winner')
		}
		else if (currentScore[0] > currentScore[1]) {
			secondScoreEl.classList.remove('winner')
			firstScoreEl.classList.add('winner')
		}
		else {
			secondScoreEl.classList.remove('winner')
			firstScoreEl.classList.remove('winner')
		}
	},
	addScoreTo = (qty, second = false) => {		
		let current = 0
		if (second)
			current = 1
		currentScore[current] += qty
		updateCurrent()
		updateHighlight()
	}


btnPlay.addEventListener('click', () => {
	timer = duration
	updateTimer()
	updateButtons()

	const timerFunc = setInterval(
		() => {
			timer--
			updateTimer()

			if (timer === 0) {
				clearInterval(timerFunc)

				if (currentScore[0] > currentScore[1])
					totalScore[0]++
				else if (currentScore[0] < currentScore[1])
					totalScore[1]++
				currentScore = [0, 0]

				updateHighlight()
				updateButtons()
				updateCurrent()
				updateTotal()

			}
		}, 1000)
})


btnAddFirst1.addEventListener('click', () => addScoreTo(1))
btnAddFirst2.addEventListener('click', () => addScoreTo(2))
btnAddFirst3.addEventListener('click', () => addScoreTo(3))
btnAddSecond1.addEventListener('click', () => addScoreTo(1, true))
btnAddSecond2.addEventListener('click', () => addScoreTo(2, true))
btnAddSecond3.addEventListener('click', () => addScoreTo(3, true))






