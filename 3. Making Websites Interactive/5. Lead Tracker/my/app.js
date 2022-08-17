const saveBtn = document.querySelector('.wrap .save'),
	saveTabBtn = document.querySelector('.wrap .save-tab'),
	deleteBtn = document.querySelector('.wrap .delete'),
	listEl = document.querySelector('.wrap ul'),
	inputEl = document.querySelector('.wrap input'),
	addToList = value => {
		const index = entries.indexOf(value)
		if (index >= 0) {
			const li = listEl.childNodes[index]
			li.classList.add('active')
			setTimeout(() => li.classList.remove('active'), 500)
			return
		}
		entries.push(value)
		localStorage.setItem('entries', JSON.stringify(entries))
		updateUIAfterAdd()
	},
	updateUIAfterAdd = () => {
		inputEl.value = ''
		deleteBtn.disabled = false
		saveBtn.disabled = true
		renderList(entries)
	},
	renderList = entries => listEl.replaceChildren(
		...entries.map(
			entry => {
				const li = document.createElement('li')
				const a = document.createElement('a')
				a.setAttribute('href', entry)
				a.setAttribute('target', '_blank')
				a.textContent = entry
				li.append(a)
				return li
			}
		)
	)

let value, entries = []
inputEl.addEventListener('input', e => {
	value = e.target.value.trim().toLowerCase()
	saveBtn.disabled = false
	try {
		new URL(value)
	}
	catch { saveBtn.disabled = true }
})

saveBtn.addEventListener('click', () => {
	addToList(value)
})

saveTabBtn.addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true },
		tabs => addToList(tabs[0].url)
	)

})
deleteBtn.addEventListener('click', () => {
	entries = []
	localStorage.clear()
	deleteBtn.disabled = true
	renderList(entries)
})

const savedEntries = localStorage.getItem('entries')
if (savedEntries)
	try {
		entries = JSON.parse(savedEntries)
		renderList(entries)
	}
	catch { entries = [] }
deleteBtn.disabled = !entries.length


