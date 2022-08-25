const
	main = document.querySelector('main'),
	fetchAPIs = async () => {
		const res = await fetch('https://api.publicapis.org/entries')
		if (!res.status === 200)
			throw EvalError(res.statusText)
		return (await res.json()).entries.slice(0, 100)
	},
	getApiEl = ({ API, Description, Auth, HTTPS, Link, Category }) => {
		const apiEl = document.createElement('article')

		apiEl.innerHTML = `
		<h2><a href="${Link}" target="_blank">${API} (${Category})</a></h2>
		<div class="descr">${Description}</div>
		<div class="auth">Auth: ${Auth}</div>
		<div class="https">HTTPS?: ${HTTPS}</div>`
		return apiEl
	}

fetchAPIs().then(
	apis => {
		console.log('apis', apis)
		main.replaceChildren(
			...apis.map(getApiEl)
		)
	}
)
	.catch(e => alert(e.message))