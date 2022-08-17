const createIcons = () => {
	const icons = document.createElement('div')
	icons.className = 'icons'

	const icon1 = document.createElement('img')
	icon1.setAttribute('src', 'img/ico/like.svg')
	icon1.setAttribute('alt', 'like')

	const icon2 = document.createElement('img')
	icon2.setAttribute('src', 'img/ico/comment.svg')
	icon2.setAttribute('alt', 'comment')

	const icon3 = document.createElement('img')
	icon3.setAttribute('src', 'img/ico/share.svg')
	icon3.setAttribute('alt', 'share')

	icons.append(icon1, icon2, icon3)
	return { icons, icon1 }
}
const main = document.querySelector('main')
main.append(
	...posts.map(item => {

		const post = document.createElement('article')
		post.className = 'post'

		const header = document.createElement('header')
		header.className = 'post-header'

		const img = document.createElement('img')
		img.setAttribute('src', `img/posts/${item.avatar}`)
		img.setAttribute('alt', item.comment)
		img.className = 'round-img'

		const authorData = document.createElement('div')
		authorData.className = 'author-data'

		const bold = document.createElement('p')
		bold.className = 'bold'
		bold.textContent = item.name

		const place = document.createElement('p')
		place.className = 'place'
		place.textContent = item.location

		authorData.append(bold, place)

		header.append(img, authorData,)

		const postImg = document.createElement('img')
		postImg.setAttribute('src', `img/posts/${item.post}`)
		postImg.setAttribute('alt', item.comment)
		postImg.className = 'post-img'


		const { icons, icon1 } = createIcons()


		const likes = document.createElement('p')
		likes.className = 'likes bold'
		likes.textContent = `${item.likes.toLocaleString()} likes`

		const p = document.createElement('p')
		const boldSpan = document.createElement('span')
		boldSpan.className = 'bold'
		boldSpan.textContent = item.username
		p.append(boldSpan, ' ', item.comment)

		const postMeta = document.createElement('footer')
		postMeta.className = 'post-meta'
		postMeta.append(icons, likes, p)

		post.append(header, postImg, postMeta)
		const dbClick = () => {
			item.likes++
			likes.textContent = `${item.likes.toLocaleString()} likes`
		}
		postImg.addEventListener('dblclick', dbClick)
		icon1.addEventListener('dblclick', dbClick)

		return post
	})
)