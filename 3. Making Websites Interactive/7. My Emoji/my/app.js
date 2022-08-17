const textEl = document.querySelector('.wrap .text'),
	inputEl = document.querySelector('.wrap input'),
	addStartBtn = document.querySelector('.add-start'),
	addEndBtn = document.querySelector('.add-end'),
	removeStartBtn = document.querySelector('.remove-start'),
	removeEndBtn = document.querySelector('.remove-end'),
	chars = [],
	doAction = (chars, action, val) => {
		if (val)
			action.call(chars, val)
		else
			action.call(chars)
		inputEl.value = ''
		value = ''
		updateButtons()
		renderText(chars)
	},

	updateButtons = () => {
		addEndBtn.disabled = addStartBtn.disabled = !value || value.length !== 2
		removeEndBtn.disabled = removeStartBtn.disabled = chars.length === 0
	},
	renderText = chars => {
		if (chars.length)
			textEl.replaceChildren(...chars.map(
				char => {
					const span = document.createElement('span')
					span.textContent = char
					return span
				}
			)
			)
		else
			textEl.innerHTML = '&nbsp;'
	}

let value = ''
inputEl.addEventListener('input', () => {
	value = inputEl.value.trim()
	updateButtons()
})

addStartBtn.addEventListener('click', () => {
	doAction(chars, Array.prototype.unshift, value)
})
addEndBtn.addEventListener('click', () => {
	doAction(chars, Array.prototype.push, value)
})
removeStartBtn.addEventListener('click', () => {
	doAction(chars, Array.prototype.shift)
})
removeEndBtn.addEventListener('click', () => {
	doAction(chars, Array.prototype.pop)
})

updateButtons()