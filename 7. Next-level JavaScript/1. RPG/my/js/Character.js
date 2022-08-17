import buildDicesHtml from './utils.js'

export default class Character {
	constructor(data) {
		Object.assign(this, data)
		this.health = Math.max(0, data.health)
		this.startHealth = this.health
		this.dead = this.health === 0
	}
	createDomEl = () => {
		const diceHtml = buildDicesHtml(this.diceCount, this.dices)
		const domEl = document.createElement('div')
		domEl.className = 'card'
		domEl.id = this.name
		domEl.innerHTML = `<div class="inner">
					<h2>${this.name}</h2>
					<div class="img-wrap">
						<div class="img">
							<img src="img/${this.name}.png" alt="${this.name}">
						</div>
					</div>
					<p>health: <span>${this.health}</span></p>
					<div class="indicator"></div>
				</div>
				<div class="dices">
					${diceHtml}
				</div>`
		return this.domEl = domEl
	}
	rollDices() {
		this.dices = new Array(this.diceCount).fill(0).map(_ => Math.ceil(Math.random() * 6))
	}
	takeDamage(damage) {
		this.health = Math.max(0, this.health - damage)
		this.dead = this.health === 0
	}
	getDamage = () => this.dices.reduce((total, current) => total + current, 0)

	updateDom() {
		const el = this.domEl
		const healthEl = el.querySelector('p span')
		healthEl.textContent = this.health
		const indEl = el.querySelector('.indicator')
		const indPercent = this.startHealth === 0 ? 0 : Math.round(100 * this.health / this.startHealth)
		indEl.style.width = `${indPercent}%`
		let indColor = 'green'
		switch (true) {
			case 0 <= indPercent && indPercent < 34:
				indColor = 'red'
				break
			case 34 <= indPercent && indPercent < 68:
				indColor = 'yellow'
				break
			default:
				indColor = 'green'
		}
		indEl.style.backgroundColor = indColor
		const diceEl = el.querySelector('.dices')
		diceEl.innerHTML = buildDicesHtml(this.diceCount, this.dices)
	}
}