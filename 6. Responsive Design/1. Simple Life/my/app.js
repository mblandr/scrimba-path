const articles = document.querySelectorAll('.articles article')

const moveStat = () => {
	articles.forEach(article => {
		const h2 = article.querySelector('h2'),
			meta = article.querySelector('.meta'),
			stat = article.querySelector('.stat')
		if (innerWidth <= 900)
			h2.appendChild(stat)
		else
			meta.appendChild(stat)
	})
}
addEventListener('resize', moveStat)
addEventListener('load', moveStat)