import './Header.css'
import logo from './img/logo.svg'
export default function Header() {
	return (
		<header>
			<img className="logo" src={logo} alt="logo" />
			<h1>ReactFacts</h1>
			<p>React Course - Project 1</p>
		</header>
	)
}