import './Header.css'
import logo from './img/logo.png'
export default function Header() {
	return (
		<header className="header-main">
			<div className="cnt">
				<img src={logo} alt="logo" />
				<h1>Meme Generator</h1>
				<p>React Course - Project 3</p>
			</div>
		</header>
	)
}