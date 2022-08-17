
import { initGame, stepGame } from './game.js'

const cards = document.querySelector('.cards'),
	bntEl = document.querySelector('button')

initGame(cards)
bntEl.addEventListener('click', () => stepGame(cards, bntEl))

