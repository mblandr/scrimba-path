const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
	"/"],	
	genRandomPassword = length => {
		let pwd = ''
		for (let i = 0; i < length; i++) {
			const index = Math.floor(Math.random() * characters.length)
			pwd += characters[index]
		}
		return pwd
	},
	showTooltip = (parent) => {		
		const tooltip = document.createElement('div')
		tooltip.textContent = 'Text copied'
		tooltip.className = 'tooltip active'
		parent.appendChild(tooltip)
		setTimeout(() => tooltip.classList.remove('active'), 500)

		setTimeout(() => tooltip.remove(), 1500)
	}
genBtn = document.querySelector('.btn-gen'),
	btn1 = document.querySelector('.btn1'),
	btn2 = document.querySelector('.btn2'),
	inputEl = document.querySelector('.input')

let passwordLength = 15

genBtn.addEventListener('click', () => {
	btn1.disabled = false
	btn2.disabled = false
	btn1.textContent = genRandomPassword(passwordLength)
	btn2.textContent = genRandomPassword(passwordLength)
})

inputEl.addEventListener('input', e => {	
	const value = +e.target.value
	genBtn.disabled = (value !== value || value <= 0)
	if (!genBtn.disabled)
		passwordLength = value

})



btn1.addEventListener('click', () => {
	navigator.clipboard.writeText(btn1.textContent)
	showTooltip(btn1)
})
btn2.addEventListener('click', () => {
	navigator.clipboard.writeText(btn2.textContent)
	showTooltip(btn2)
})
