const buildDicesHtml = (length, items) => {
	let htmlStr = items.reduce((accum, item) => accum + `<div class="dice">${item}</div>`, '')
	const delta = length - items.length
	if (delta > 0)
		htmlStr += new Array(delta).fill(0).reduce((accum, _) => accum + `<div class="empty"></div>`, '')
	return htmlStr
}

export default buildDicesHtml