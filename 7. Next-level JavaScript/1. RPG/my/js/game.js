import wizard, { monsters } from './data.js'

let monster = monsters.shift()
const
	initGame = cards =>
		cards.append(...[wizard, monster].map(character => character.createDomEl())),

	stepGame = (cards, btnEl) => {
		wizard.rollDices()
		monster.rollDices()
		wizard.takeDamage(monster.getDamage())
		monster.takeDamage(wizard.getDamage())
		updateGameState(cards, btnEl)
	},

	updateGameState = (parent, bntEl) => {
		wizard.updateDom()
		monster.updateDom()
		if (wizard.dead)
			gameOver(bntEl)
		else if (monster.dead)
			if (monsters.length) {
				monster = monsters.shift()
				bntEl.disabled = true
				setTimeout(() => {
					parent.replaceChild(monster.createDomEl(), parent.lastChild)
					bntEl.disabled = false
				}, 1000)
			}
			else
				gameOver(bntEl)
	},

	gameOver = buttonEl => {
		buttonEl.disabled = true
		let htmlString = '<div class="over"><h1>Game Over</h1>'
		if (wizard.dead && monster.dead)
			htmlString += '<p>All dead!</p>'
		else
			if (wizard.dead)
				htmlString += `<p p > ${monster.name} win!</p > `
			else
				htmlString += `<p p > Wizard win!</p > `
		setTimeout(() => document.body.innerHTML = htmlString + '</div>', 1000)

	}


export { initGame, stepGame }	