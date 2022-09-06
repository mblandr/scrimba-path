import './Header.css'
import logo from './img/logo.svg'
export default function Header({ handleToggler, isLight }) {
	const classes = ['toggler']
	if (isLight)
		classes.push('toggled')
	const classNames = classes.join(' ')
	return (
		<header>
			<img className="logo" src={logo} alt="logo" />
			<h1>ReactFacts</h1>
			<div className={classNames} onClick={handleToggler} >
				<span className="light">light</span>
				<div className="indicator"></div>
				<span className="dark">dark</span>
			</div>
		</header>
	)
}