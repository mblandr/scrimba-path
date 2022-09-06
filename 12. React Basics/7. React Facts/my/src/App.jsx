import Header from './components/Header'
import Main from './components/Main'
import { useState, useEffect } from 'react'
import './App.css'
export default function App() {


	const [isLight, setIsLight] = useState(false),
		handleToggler = e => {
			localStorage.setItem('lightTheme', !isLight)
			setIsLight(!isLight)
		},
		classes = ['cnt']
	useEffect(() => {

		if (localStorage.getItem('lightTheme') === 'true')
			setIsLight(true)
	}, [])
	if (isLight)
		classes.push('light-theme')
	const classNames = classes.join(' ')

	return <div className={classNames}>
		<Header handleToggler={handleToggler} isLight={isLight} />
		<Main />
	</div>
}