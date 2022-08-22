const ul = document.querySelector('ul'),
	h1 = document.querySelector('h1'),
	p = document.querySelector('p')
fetchData = () => {
	fetch('http://localhost/api/activity')
		.then(res => {
			if (!res.ok)
				throw new Error(res.statusText)
			return res.json()
		})
		.then(res => {
			const li = document.createElement('li')
			h1.textContent = 'HappyBot'
			p.textContent = 'Found something'
			li.textContent = res.message
			ul.append(li)
			document.body.style.background = 'linear-gradient(to bottom right, red, white)'

		})
		.catch(err => alert(err.message))
}