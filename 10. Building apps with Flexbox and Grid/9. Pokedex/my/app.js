const
	mainEL = document.querySelector('main'),
	loaderEl = document.querySelector('.loader'),
	genArticleHtml = (item) => `
	<article>
			<div class="num">${item.id}</div>			
			<div class="name">${item.name.english}</div>
			<div class="type">${item.type.join(' / ')}</div>
			<div class="hp">HP: ${item.base.HP}</div>
			<div class="attack">Attack: ${item.base.Attack}</div>
			<div class="defense">Defense: ${item.base.Defense}</div>
			<div class="speed">Speed: ${item.base.Speed}</div>
			<div class="name-alt">${item.name.japanese}</div>
			<div class="name-alt">${item.name.chinese}</div>
			<div class="name-alt">${item.name.french}</div>
		</article>`,
	start = async () => {
		loaderEl.style.display = 'flex'
		const res = await fetch('pokemon.json')
		if (!res.ok) throw Error(e.statusText)
		const data = await res.json()
		mainEL.innerHTML = data
			.map(
				item => genArticleHtml(item)
			)
			.join('')
		loaderEl.style.display = 'none'
	}


try {
	start()
}
catch (e) {
	alert(e.message)
}
