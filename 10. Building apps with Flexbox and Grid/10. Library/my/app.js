const mainEl = document.querySelector('main'),
	buildBookHtml = book => `
<article>
<h2>${book.title}</h2>
<div class="cover"></div>
<div class="footer"></div>
</article>`

console.log(mainEl)
fetch('books.json')
	.then(res => res.json())
	.then(books =>
		mainEl.innerHTML = books.map(buildBookHtml).join('')
	)
	.catch(alert)