//https://picsum.photos/id/${photo.id}/100/100
const
	photosEl = document.querySelector('.photos'),
	previewEl = document.querySelector('.preview'),
	loadImage = (url, title) => {
		return new Promise(
			(resolve, reject) => {
				const img = document.createElement('img')
				img.src = url
				img.setAttribute('alt', title)
				img.addEventListener('load', () => resolve(img))
				img.addEventListener('error', e => reject(e))
			}
		)
	},
	setPreview = (url, title) => {

		if (previewEl.children.length === 0) {
			const imgEl = document.createElement('img')
			previewEl.append(imgEl)
		}
		const imgEl = previewEl.children[0]
		imgEl.src = url
		imgEl.setAttribute('alt', title)
	}


Promise.allSettled(photos.map(photo => loadImage(`https://picsum.photos/id/${photo.id}/200/200`, photo.title)))
	.then(
		results => {
			const imgEls = results.reduce(
				(accum, current, index) => {
					if (current.status === 'fulfilled') {
						const { id, title } = photos[index],
							imgEl = current.value
						imgEl.addEventListener('click', () => {
							setPreview(`https://picsum.photos/id/${id}/400/400`, title)
						})

						accum.push(current.value)
					}
					return accum
				}, []
			)
			if (imgEls.length > 0) {

				setPreview(imgEls[0].src, photos[0].title)
			}
			photosEl.replaceChildren(...imgEls)

		}
	)
	.catch(e => alert(e.message))



