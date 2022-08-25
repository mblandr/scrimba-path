
const
	usersEl = document.querySelector('.users'),
	buildUserItem = name => {
		const divEl = document.createElement('div')
		divEl.classList.add('usercard')

		divEl.innerHTML = `
			<p class="username">${name}</p>
				<div class="icon"></div>
			`
		return divEl
	},
	buildUserProfile = user => `
		<div class="userinfo">
			<header>
				<h2><span>${user.name}</span> <span>@${user.username}</span></>
			</header>
			<section class="company">
				<h2>${user.company.name}</h2>
				<p>${user.company.catchPhrase}</p>
			</section>
			<section class="contacts">
				<p>📧: <a href="mailto:${user.email}">${user.email}</a></p>
				<p>📞: <a href="tel:${user.phone}">${user.phone}</a></p>
				<p>💧: <a href="https://${user.website}" target="_blank">https://${user.website}</a></p>
			</section>
			<section class="address">
				<p>${user.address.street}, ${user.address.suite}</p>
				<p>${user.address.city}, ${user.address.zipcode}</p>				
			</section>
		</div>`,
	buildLayout = users => {
		const headerEl = document.createElement('header'),
			footerEl = document.createElement('footer'),
			flexEl = document.createElement('div'),
			usersEl = document.createElement('div'),
			mainEl = document.createElement('section')

		mainEl.className = 'main'
		mainEl.textContent = 'Main content'
		flexEl.className = 'flex'
		headerEl.textContent = 'Header'
		headerEl.className = 'main-header'
		footerEl.textContent = 'Footer'
		footerEl.className = 'main-footer'
		usersEl.className = 'users'

		usersEl.replaceChildren(...users.map(
			user => {
				const userEl = buildUserItem(user.name)
				userEl.addEventListener('click', () => {
					mainEl.innerHTML = buildUserProfile(user)
				})
				return userEl
			}
		))
		flexEl.replaceChildren(usersEl, mainEl)
		document.body.replaceChildren(headerEl, flexEl, footerEl)
	}
fetch('https://jsonplaceholder.typicode.com/users')
	.then(
		res => {
			if (!res.ok)
				throw Error(res.statusText)
			return res.json()
		}
	)
	.then(users => buildLayout(users))
	.catch(e => alert(e.message))




