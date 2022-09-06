import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import Meme from './components/Meme'
import Loader from './components/Loader'
import Error from './components/Error'
import { useState, useEffect } from 'react'
export default function App() {

	const [isLoading, setIsLoading] = useState(false),
		[error, setError] = useState(''),
		[memes, setMemes] = useState([]),
		[meme, setMeme] = useState({
			first: '',
			second: ''
		}),
		handleInput = formData => {
			const { first, second } = formData
			setMeme(old => ({ ...old, first, second }))
		},
		handleSend = formData => {
			const { first, second } = formData,
				index = Math.floor(Math.random() * memes.length)			
			setMeme({
				first, second, imgUrl: memes[index].url
			})
		}
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true)
				const res = await fetch('https://api.imgflip.com/get_memes')
				if (res.status !== 200)
					throw new Error(res.statusText)
				const data = await res.json()
				setMemes(data.data.memes)				
			}
			catch (e) {
				setError(e.message)
				setTimeout(() => setError(false), 3000)
			}
			finally {
				setIsLoading(false)
			}
		})()
	}, [])
	return (
		<>
			{isLoading && <Loader />}
			<Header />
			<div className="cnt">
				{error && <Error error={error} />}
				<Form onInput={handleInput} onSend={handleSend} />
				<Meme {...meme} />
			</div>
		</>
	)
}