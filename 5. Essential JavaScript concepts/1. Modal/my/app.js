const showBtn = document.querySelector('.btn-show'),
	closeBtn = document.querySelector('.btn-close'),
	wrapper = document.querySelector('.wrapper'),
	modal = document.querySelector('.modal'),
	closeModal = () => {
		wrapper.style.opacity = 0;
		setTimeout(() => wrapper.style.display = "none", 500)
	}

showBtn.addEventListener('click', () => {
	wrapper.style.opacity = 1
	wrapper.style.display = 'flex'

})
closeBtn.addEventListener('click', closeModal)

wrapper.addEventListener('click', closeModal)

modal.addEventListener('click', e => e.stopPropagation())

