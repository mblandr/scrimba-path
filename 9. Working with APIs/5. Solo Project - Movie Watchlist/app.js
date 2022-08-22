const
	baseUrl = 'http://www.omdbapi.com/?apikey=bd723077',
	inputEl = document.querySelector('input'),
	searchBtn = document.querySelector('form button'),
	formEl = document.querySelector('form'),
	mainEl = document.querySelector('main'),
	loaderEl = document.querySelector('.loader'),
	showNothingEl = () => {
		const nothing = document.createElement('div')
		nothing.className = 'nothing'
		nothing.innerHTML = mainEl.classList.contains('watch') ?
			`<p>
				Your watchlist is looking a little empty...
			</p>
			<a href="index.html"><img src="img/plus.svg">Lets add some movies!</a>`
			:
			`<p>
			Unable to find what you’re looking for. Please try another search.
			</p>`
		mainEl.replaceChildren(nothing)
	},
	convertDataToArticles = data => {

		if (data.length >= 1) {
			const articles = data.map(({ imdbID: id, Title: title, Ratings, Runtime: duration, Genre: genres, Poster: poster, Plot: description }) => {
				const ratings = Ratings.length === 0 ? '' : Ratings[0].Value,
					article = document.createElement('article'),
					inList = inWatchlist(ids, id)

				article.innerHTML = buildArticle({ title, ratings, genres, duration, poster, inList, description }),
					btn = article.querySelector('button')

				btn.addEventListener('click', (e) => {
					const span = article.querySelector('button span'),
						img = article.querySelector('button img'),
						inList = inWatchlist(ids, id)
					if (inList) {
						ids = removeFromWatchlist(ids, id)
						if (mainEl.classList.contains('watch')) {
							article.remove()
							if (ids.length === 0)
								showNothingEl()
						}
						else {

							span.textContent = 'watchlist'
							img.setAttribute('src', 'img/plus.svg')
						}
					}
					else {
						addToWatchlist(ids, id)
						span.textContent = 'remove'
						img.setAttribute('src', 'img/minus.svg')
					}
				})
				return article
			})
			mainEl.replaceChildren(...articles)
		}
		else showNothingEl()
	},

	doFetch = id => fetch(`${baseUrl}&i=${id}`, { signal })
		.then(res => {
			if (!res.ok)
				throw new Error(`Error for movie ${id}: ${res.status}, ${res.statusText}`)
			return res.json()
		}),
	loadMovieIds = () => JSON.parse(localStorage.getItem('movies') || '[]'),
	saveMovieIds = ids => localStorage.setItem('movies', JSON.stringify(ids)),
	addToWatchlist = (ids, id) => {
		if (!ids.includes(id)) {
			ids.push(id)
			saveMovieIds(ids)
		}

	},
	removeFromWatchlist = (ids, id) => {
		if (ids.includes(id)) {
			const newIds = ids.filter(curId => curId !== id)
			saveMovieIds(newIds)
			return newIds
		}

	},

	inWatchlist = (ids, id) => ids.includes(id),

	buildArticle = ({ title, poster, ratings, duration, genres, inList, description }) => `
	<div div class= "img-wrap">
	<div class="img">
	${poster === 'N/A' ? '' : `<img src="${poster}" alt="${title}">`}									
	</div>
	</div>
		<div class="text">
			<div class="title">
				<h2>${title}</h2>
				<img src="img/star.svg">
					<span class="rating">${ratings}</span>
			</div>
			<div class="meta">
				<span class="duration">${duration}</span>
				<span class="genres">${genres}</span>
				<button><img src="img/${inList ? 'minus' : 'plus'}.svg"><span>${inList ? 'remove' : 'wishlist'}</span></button>
			</div>
			<p>
				${description}
			</p>
		</div>
	`
let
	ac = new AbortController,
	signal = ac.signal,
	ids = loadMovieIds()

if (inputEl)
	inputEl.addEventListener('input', e => {
		const value = e.target.value.trim()
		searchBtn.disabled = !value
	})

if (formEl)
	formEl.addEventListener('submit', e => {
		e.preventDefault()
		ac = new AbortController
		signal = ac.signal
		loaderEl.style.display = 'flex'
		const searchStr = inputEl.value.trim().toLowerCase()
		fetch(`${baseUrl}&s=${searchStr}&type=movie`)
			.then(res => {
				if (!res.ok) throw new Error(res.statusText)
				return res.json()
			})
			.then(data => {
				if (data.Error)
					throw new Error(`Error search ${searchStr}: ${data.Error}`)
				const arr = data.Search,
					promises = arr.map(
						item => doFetch(item.imdbID)
					)
				return Promise.all(promises)
			})
			.then(convertDataToArticles)
			.catch(e => {
				ac.abort()
				alert(e.message)
			})
			.finally(() => loaderEl.style.display = 'none')
	})



if (searchBtn)
	searchBtn.disabled = true