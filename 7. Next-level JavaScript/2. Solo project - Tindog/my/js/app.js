import dogsData from './data.js'
import Dog from './Dog.js'
const acceptBtn = document.querySelector('.accept'),
	rejectBtn = document.querySelector('.reject'),
	cnt = document.querySelector('.img-wrapper'),

	setButtonsState = enabled => rejectBtn.disabled = acceptBtn.disabled = !enabled,

	doAction = state => {
		if (dogs.length === 0)
			return
		const dog = dogs[0]
		dog.state = state
		setButtonsState(false)
		dog.render()
		setTimeout(
			() => {
				dog
					.removeClass('active')
					.addClass('prev')
				setTimeout(() => {
					if (dogs.length > 1) {
						fadeIn(dogs[1])
					}
					setTimeout(
						() => {
							cnt.removeChild(dog.domEl)
							dogs = dogs.filter(curr => curr !== dog)
							console.log(dogs)
							setButtonsState(dogs.length >= 1)
						}
						, 500)
				}, 0)
			}, 1000)


	},

	fadeIn = dog => dog.removeClass('next').addClass('active')

let dogs = dogsData.map(dogData => new Dog(dogData))


acceptBtn.addEventListener('click', () => doAction('liked'))
rejectBtn.addEventListener('click', () => doAction('disliked'))

cnt.replaceChildren(...dogs.map(dog => dog.render()))
fadeIn(dogs[0])



