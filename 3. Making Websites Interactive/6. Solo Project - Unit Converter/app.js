const buildUnitsList = (type, value) => {
	const data = unitsData[type],
		baseUnit = data.base,
		capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase(),
		unitNames = [capitalize(baseUnit)],
		content = [],
		s = value > 1 ? 's' : ''

	Object.entries(data).forEach(entry => {
		if (entry[0] !== 'base') {
			const unitName = entry[0],
				unitC = entry[1],
				result1 = value / unitC,
				result2 = value * unitC,
				s1 = result1 > 1 ? 's' : '',
				s2 = result2 > 1 ? 's' : '',
				str = `${value} ${baseUnit}${s} = ${result1.toFixed(3)} ${unitName}${s1} | ${value} ${unitName}${s} = ${result2.toFixed(3)} ${baseUnit}${s2}`

			content.push(str)
			unitNames.push(capitalize(unitName))
		}

	}),
		headerText = `${capitalize(type)} (${unitNames.join('/')})`,
		children = [],
		h2 = document.createElement('h2')
	h2.textContent = headerText
	children.push(h2)

	content.forEach(str => {
		const p = document.createElement('p')
		p.textContent = str
		children.push(p)
	})

	const item = document.createElement('article')
	item.className = 'item'
	item.replaceChildren(...children)
	return item

},
	doConversion = () => {
		const items = []
		for (const type in unitsData)
			items.push(buildUnitsList(type, value))
		itemsEl.replaceChildren(...items)
	}

let value = 20

const itemsEl = document.querySelector('.items'),
	inputEl = document.querySelector('.wrap input'),
	convertBtn = document.querySelector('.wrap button')

inputEl.addEventListener('input', () => {
	value = +inputEl.value.trim()
	convertBtn.disabled = !value || value <= 0

})

convertBtn.addEventListener('click', () => {
	doConversion()
})


doConversion()
