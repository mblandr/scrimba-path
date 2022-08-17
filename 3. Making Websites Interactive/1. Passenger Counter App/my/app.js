const currentEl = document.querySelector('.current'),
	incBtn = document.querySelector('.increment'),
	saveBtn = document.querySelector('.save'),
	summaryEl = document.querySelector('.summary'),
	entries = [],
	updateSummary = () => summaryEl.textContent = entries.join(' - '),
	updateCurrent = () => currentEl.textContent = current,
	updateButton = () => saveBtn.disabled = current === 0

let current = 0
incBtn.addEventListener('click', () => {
	current++
	updateCurrent()
	updateButton()
})
saveBtn.addEventListener('click', () => {
	entries.push(current)
	current = 0
	updateCurrent()
	updateButton()
	updateSummary()
})
