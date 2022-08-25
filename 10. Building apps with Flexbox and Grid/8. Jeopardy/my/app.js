const count = 7,
	rows = 6,
	mainEl = document.querySelector('main'),
	buildColumn = title => {
		const result = new Array,
			headerEl = document.createElement('div')
		headerEl.className = 'head'
		headerEl.textContent = title
		result.push(headerEl)
		for (let i = 1; i <= rows; i++) {
			const itemEl = document.createElement('div')
			itemEl.className = 'item'
			itemEl.textContent = `$${i * 100}`
			itemEl.style.cssText = `grid-row-start: ${i + 1}`
			result.push(itemEl)
		}
		return result
	}

fetch(`https://jservice.io/api/categories?count=${count}&offset=44`)
	.then(
		res => {
			if (!res.ok)
				throw Error(res.statusText)
			return res.json()
		}
	)
	.then(
		data => {
			const res = data.map(item => buildColumn(item.title))
			console.log('res', res)
			const res2 = res.reduce(

				(accum, current) => {
					console.log(current)
					accum.push(...current)
					return accum
				}, [])
			console.log('res2', res2)
			mainEl.replaceChildren(...res2)
		})
	.catch(err => alert(err.message))


