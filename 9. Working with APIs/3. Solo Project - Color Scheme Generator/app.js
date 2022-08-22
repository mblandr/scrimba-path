

const schemes = [
	"monochrome",
	"monochrome-dark",
	"monochrome-light",
	"analogic",
	"complement",
	"analogic-complement",
	"triad",
	"quad"
],

	createSelect = items => {
		const selectItem = el => {
			itemsEl.childNodes.forEach(
				itemEl => {
					itemEl === el ? itemEl.classList.add('selected-item') : itemEl.classList.remove('selected-item')
				}
			)
			selectedValue = el.textContent
			selectedEl.textContent = el.textContent
			selectEl.classList.remove('opened')

		},
			btn = document.querySelector('form button'),
			selectEl = document.createElement('div'),
			selectedEl = document.createElement('div'),
			itemsEl = document.createElement('div')

		selectEl.className = 'select'
		selectedEl.className = 'selected'
		itemsEl.className = 'items'
		selectEl.append(selectedEl, itemsEl)


		selectedEl.addEventListener('click', () => {
			selectEl.classList.toggle('opened')
		})

		itemsEl.replaceChildren(
			...items.map(
				(item, index) => {
					const itemEl = document.createElement('div')
					if (index === 0) {
						selectedEl.textContent = item
						itemEl.classList.add('selected-item')
					}

					itemEl.addEventListener('click', () => selectItem(itemEl))
					itemEl.textContent = item
					return itemEl
				}
			))

		btn.insertAdjacentElement('beforebegin', selectEl)
	},
	form = document.querySelector('form'),
	colors = document.querySelector('.colors')
button = document.querySelector('button')

let selectedValue = schemes[0]

form.addEventListener('submit', e => {
	e.preventDefault()
	button.disabled = true

	const color = form.color.value.slice(1)
	fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${selectedValue}&count=5`)
		.then(res => {
			if (!res.ok)
				throw new Error(res.statusText)
			return res.json()
		})
		.then(data =>
			data.colors.forEach(
				(item, index) => {
					const colorEl = colors.children[index].querySelector('.color')
					colorEl.style.backgroundColor = item.hex.value
					colorEl.style.border = 'none'
					const valueEl = colors.children[index].querySelector('.value')
					valueEl.addEventListener('click', () => {
						const el = document.createElement('div')
						navigator.clipboard.writeText(item.hex.value)
						el.textContent = 'Color copied'
						el.className = 'copied'
						valueEl.append(el)
						setTimeout(() => {							
							el.remove()
						}, 1100)
					})
					valueEl.textContent = item.hex.value
					valueEl.style.cursor = 'pointer'
				}
			)
		)
		.catch(e => alert(e.message))
		.finally(() => button.disabled = false)
})

createSelect(schemes)



