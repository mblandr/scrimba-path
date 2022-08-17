const numSlide = 6,
	slider = document.querySelector('.slider'),
	circlesEl = document.querySelector('.circles'),
	nextBtn = document.querySelector('.btn-next'),
	prevBtn = document.querySelector('.btn-prev'),
	items = [],
	circles = [],
	shiftIndex = (index, delta) => {
		let newIndex = (index + delta) % numSlide
		if (newIndex < 0)
			newIndex += numSlide
		return newIndex
	},

	setCurrent = index => {
		index = shiftIndex(index, 0)
		current = index
		items.forEach((item, i) => {
			if (i === current)
				item.className = 'item'
			else if (shiftIndex(i, -1) === current)
				item.className = 'item next'
			else
				item.className = 'item prev'
		})
		circles.forEach((circle, i) => {
			if (i === current)
				circle.classList.add('current')
			else
				circle.classList.remove('current')
		})
	},
	doSlider = () => {
		timer = setTimeout(() => {
			current += direction
			direction = 1
			setCurrent(current)

			doSlider()
		}, 2000)

	}

let current = 0, timer, direction=1

for (let i = 1; i <= numSlide; i++) {
	const item = document.createElement('div')
	item.className = 'item'
	const img = document.createElement('img')
	img.setAttribute('src', `img/${i}.jpg`)
	item.append(img)
	items.push(item)
	const circle = document.createElement('div')
	circle.className = 'circle'
	circles.push(circle)
}

prevBtn.addEventListener('click', () => {
	direction = -1
})
nextBtn.addEventListener('click', () => {
	direction = 1
})

slider.append(...items)
circlesEl.append(...circles)

setCurrent(0)
doSlider()