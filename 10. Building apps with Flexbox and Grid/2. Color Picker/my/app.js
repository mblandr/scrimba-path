//https://apis.scrimba.com/hexcolors/
const colorsEl = document.querySelector('.colors')

fetch('https://apis.scrimba.com/hexcolors/?count=100')
	.then(
		res => {
			if (res.status !== 200)
				throw Error(res.statusText)
			return res.json()
		}
	)
	.then(
		data => {
			colorsEl.replaceChildren(...data.colors.map(item => {
				const cell = document.createElement('div')
				cell.className = 'cell'
				cell.style.backgroundColor = item.value
				return cell
			}))
		}
	)
	.catch(e => alert(e.message))




