const
	formEl = document.querySelector('form'),
	inputEl = document.querySelector('input'),
	mainEl = document.querySelector('main'),
	buildShowEl = item => {
		const { show } = item
		const articleEl = document.createElement('article')
		articleEl.innerHTML = `		
			<h2>${show.name}</h2>
			<img src="${show.image.original}" alt="${show.name}">
			<div class="content">
			${show.summary ? show.summary : '<p>No summary</p>'}
			</div>
			<button>show episodes</button>`
		const btnEl = articleEl.querySelector('button')
		btnEl.addEventListener('click', () => {
			fetchEpisodes(show.id)
				.then(episodes => showEpisodes(show, episodes))
		})
		return articleEl
	},
	showEpisodes = (data, episodes) => {
		const modalEl = document.querySelector('.modal'),
			inner = modalEl.children[0]
		inner.innerHTML = `
			<button>X</button>
			<h2>${data.name}</h2>
			<div class="content">${data.summary}</div>
			<div class="episodes">
			${episodes.map(
			episode => `<div class="episode">
										<img src="${episode.image
					?
					episode.image.original
					:
					'img/no-photo.svg'
				}" alt="${episode.name}">
									<p> ${episode.name}</p>
										</div> `
		).join('')}
		</div>`
		const btnEl = inner.querySelector('button')
		btnEl.addEventListener('click', e => {
			modalEl.style.display = 'none'
		})
		modalEl.style.display = 'flex'
	},

	fetchEpisodes = async id => {
		const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
		if (!res.status === 200)
			throw Error(res.statusText)
		return await res.json()
	},
	fetchData = async query => {
		const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
		if (!res.status === 200)
			throw Error(res.statusText)
		return await res.json()
	}

formEl.addEventListener('submit', e => {
	e.preventDefault()
	const search = inputEl.value.trim().toLowerCase()
	if (search) {
		fetchData(search)
			.then(data => {
				if (data.length === 0)
					alert('No data received')
				else
					mainEl.replaceChildren(
						...data.map(show => buildShowEl(show))
					)
			})
	}
})

