const base = 'http://localhost/api',
	parentEl = document.querySelector('.posts'),
	formEl = document.querySelector('form')
const fetchPosts = () => {
	fetch(`${base}/posts`)
		.then(res => {
			if (!res.ok)
				throw new Error(res.statusText)
			return res.json()
		})
		.then(data => {
			console.log('data', data)
			const posts = data.slice(0, 5)
			parentEl.replaceChildren(...posts.map(post => {
				const article = document.createElement('article')
				article.innerHTML = `
				<h2>${post.title}</h2>
				<p>${post.body}</p>
				`
				return article
			}))
		})
		.catch(e => alert(e.message))
}

formEl.addEventListener('submit', e => {
	e.preventDefault()
	fetch(`${base}/posts/add`, {
		method: 'post',
		body: JSON.stringify({
			title: formEl.title.value,
			body: formEl.body.value
		})
	})
		.then(res => {
			if (!res.ok)
				throw new Error(res.statusText)
			formEl.reset()	
			fetchPosts()
		})
		.catch(e => alert(e.message))
})
fetchPosts()