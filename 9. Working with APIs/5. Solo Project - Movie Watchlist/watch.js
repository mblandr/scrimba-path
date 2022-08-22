addEventListener('load', () => {
	loaderEl.style.display = 'flex'
	ac = new AbortController
	signal = ac.signal
	const promises = loadMovieIds().map(
		id => doFetch(id)
	)
	Promise
		.all(promises)
		.then(convertDataToArticles)
		.catch(e => {
			ac.abort()
			alert(e.message)
		})
		.finally(() => loaderEl.style.display = 'none')

})