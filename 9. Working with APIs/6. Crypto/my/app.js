const
	cryptoNameEl = document.querySelector('.crypto h2 span'),
	cryptoCoursesEls = document.querySelectorAll('.crypto p span'),

	tempEl = document.querySelector('.temp span'),

	cityEl = document.querySelector('.city'),
	timeEl = document.querySelector('h1'),
	updateCrypto = () => {
		cryptoCoursesEls[0].textContent =
			cryptoCoursesEls[1].textContent =
			cryptoCoursesEls[2].textContent = '...'
		fetch(`https://api.coingecko.com/api/v3/coins/dogecoin/`)
			.then(
				res => {
					if (!res.ok)
						throw new Error(res.statusText)
					return res.json()
				}
			)
			.then(data => {
				cryptoNameEl.textContent = data.name

				if (!cryptoImgEl) {
					cryptoImgEl = document.createElement('img')
					cryptoNameEl.parentNode.prepend(cryptoImgEl)
				}
				cryptoImgEl.setAttribute('src', data.image.thumb)
				cryptoCoursesEls[0].textContent = data.market_data.current_price.usd
				cryptoCoursesEls[1].textContent = data.market_data.high_24h.usd
				cryptoCoursesEls[2].textContent = data.market_data.low_24h.usd
			})
			.catch(e => {
				if (!errorCryptoShown) {
					alert('fetching crypto: ' + e.message)
					errorCryptoShown = true
				}
			}
			)
	},
	updateTime = () => {
		const now = new Date()
		timeEl.textContent = now.toLocaleTimeString('ru-ru', { hour: '2-digit', minute: '2-digit' })
	},
	updateWeather = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric
				`)
					.then(
						res => {
							if (!res.ok)
								throw new Error(res.statusText)
							return res.json()
						}
					)
					.then(data => {
						cityEl.textContent = data.name

						if (!imgEl) {
							imgEl = document.createElement('img')
							tempEl.parentNode.prepend(imgEl)
						}
						imgEl.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
						tempEl.textContent = data.main.temp.toFixed(0)
					})
					.catch(e => {
						if (!errorWeatherShown) {
							alert('fetching weather: ' + e.message)
							errorWeatherShown = true
						}
					})

			},
			e => {
				if (!errorPermissionDeniedShown) {
					alert('fetching position: ' + e.message)
					errorPermissionDeniedShown = true
				}

			}
		)

	},
	loadPage = () => {
		updateTime()
		setInterval(updateTime, 1000)
		updateWeather()
		setInterval(updateWeather, 3600)
		updateCrypto()
		setInterval(updateWeather, 1000)
	}

let errorPermissionDeniedShown = false,
	errorWeatherShown = false,
	errorCryptoShown = false,
	imgEl = document.querySelector('.temp img'),
	cryptoImgEl = document.querySelector('.crypto h2 img')


loadPage()
