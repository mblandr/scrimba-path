const itemsEl = document.querySelector('.items'),
	searchInputEl = document.querySelector('.search-box'),
	renderChildren = (parent, children) =>
		parent.replaceChildren(...children.map(str => {
			const item = document.createElement('div')
			item.className = 'item'
			item.textContent = str
			return item
		}))

renderChildren(itemsEl, items)
const itemsCollection = document.querySelectorAll('.item')

//searchInput.addEventListener('input', e => {
//	const value = e.target.value.trim().toLowerCase()
//	children = items.filter(item => item.toLowerCase().includes(value))
//	renderChildren(itemsEl, children)
//})


searchInputEl.addEventListener('input', e => {
	const value = e.target.value.trim().toLowerCase()
	itemsCollection.forEach(item => {
		console.log(item, item.textContent)
		const curValue = item.textContent.trim().toLowerCase()
		item.style.display = curValue.includes(value) ? 'block' : 'none'
	})
	//children = items.filter(item => item.toLowerCase().includes(value))
	//renderChildren(itemsEl, children)
})


