export default class Dog {
	constructor(data) {
		Object.assign(this, data)
		this.state = ''
		this.domEl = document.createElement('div')
		this.domEl.className = 'img next'
	}

	render() {
		this.domEl.innerHTML = `<div class="shadow"></div>
		<img class="main-img" src="img/dogs/${this.name.toLowerCase()}.jpg" alt="${this.name}">
		<div class="text">
			<h2>${this.name}, ${this.age}</h2>
			<p>${this.bio}</p>
		</div>
		${this.state === '' ? '' : `<img class="rating" src="img/${this.state === 'liked' ? 'like' : 'nope'}.png" alt="">`}`
		setTimeout(() => {
			const ratingEl = this.domEl.querySelector('.rating')
			ratingEl.classList.add('active')
		}, 0)
		return this.domEl
	}

	addClass(name) {
		this.domEl.classList.add(name)
		return this
	}

	removeClass(name) {
		this.domEl.classList.remove(name)
		return this
	}

}