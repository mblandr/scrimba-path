'use strict'

const
	headerEl = document.querySelector('.header-main'),
	hambBtn = headerEl.querySelector('.btn-nav'),
	navEl = headerEl.querySelector('.header-main nav'),
	aEls = headerEl.querySelectorAll('a')


hambBtn.addEventListener('click',
	() => {
		navEl.classList.toggle('opened')
	})

aEls.forEach(
	a => a.addEventListener('click',
		() => navEl.classList.remove('opened'))
)	